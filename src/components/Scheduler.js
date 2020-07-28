import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setActiveDriver,
  setFilteredAppointments,
  setActiveDriverTimeInverval,
  setCsvData,
} from "../actions";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import Header from "./Header";
import Modal from "./Modal";
import { BasicLayout } from "./BasicFormLayout";
import {
  RemoveComponent,
  dropDown,
  customizeLabel,
  checkError,
  commitChanges,
  convertData4csv,
} from "../helpers/SchedulerHelpers";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);


const SchedulerComponent = (props) => {
  const {
    activeDriver,
    setActiveDriver,
    filteredAppointments,
    setFilteredAppointments,
    activeDriverTimeInverval,
    setActiveDriverTimeInverval,
    csvData,
    setCsvData,
  } = props;

  const [schedulerState, setSchedulerState] = useState({
    data: [],
    currentDate: new Date(),
  });

  const [showModal, setShowModal] = useState(false);
  const [conflictingAppointment, setConflictingAppointment] = useState([]);
  const [activeAppointment, setActiveAppointment] = useState({
    appointment: null,
    chgType: null,
    appointmentChanges: {},
    editingAppointmentId: undefined

  });


  const changeAddedAppointment = (addedAppointment) => {
    console.log(addedAppointment)
    // const nextAddedAppointment = !moment(addedAppointment.startDate).isSame(
    //   addedAppointment.endDate,
    //   "day"
    // )
    //   ? {
    //       ...addedAppointment,
    //       endDate: moment(addedAppointment.startDate)
    //         .add(30, "minutes")
    //         .toDate()
    //     }
    //   : addedAppointment;

    const chgAddedAppointment = {...addedAppointment, endDate: moment(addedAppointment.startDate).add(30, "minutes").toDate() }
    console.log(chgAddedAppointment)
      setActiveAppointment({ appointment: chgAddedAppointment, chgType:"added" });
  }

 


  const handleOverwrite = () => {
    //deletes old conflicting appointments
    conflictingAppointment.forEach((conflict) => {
      commitChanges(
        undefined,
        undefined,
        conflict,
        setSchedulerState,
        activeDriver
      );
    });
    setConflictingAppointment([]);

    if (activeAppointment.chgType === "changed") {
      commitChanges(
        undefined,
        activeAppointment.appointment,
        undefined,
        setSchedulerState,
        activeDriver
      );
    } else if (activeAppointment.chgType === "added") {
      commitChanges(
        activeAppointment.appointment,
        undefined,
        undefined,
        setSchedulerState,
        activeDriver
      );
    }
  };

  const messages = {
    moreInformationLabel: '',
  };

  useEffect(() => {
    const filteredAppointments = schedulerState.data.filter(
      (appointment) => appointment.driver === activeDriver
    );

    setFilteredAppointments(filteredAppointments);
  }, [activeDriver, schedulerState]);

  

  return (
    <Paper>
      <Header
        activeDriver={activeDriver}
        setActiveDriver={setActiveDriver}
        activeDriverTimeInverval={activeDriverTimeInverval}
        setActiveDriverTimeInverval={setActiveDriverTimeInverval}
        csvData={csvData}
        setCsvData={setCsvData}
        convertData4csv={convertData4csv}
      />

      <Scheduler data={filteredAppointments} height={760}>
        <ViewState
          defaultCurrentDate={schedulerState.currentDate}
          defaultCurrentViewName="Week"
        />

        <EditingState
          onCommitChanges={(chgType) =>
            checkError(
              chgType,
              setSchedulerState,
              activeDriver,
              setActiveAppointment,
              filteredAppointments,
              setShowModal,
              setConflictingAppointment
            )
          }
          onAddedAppointmentChange={changeAddedAppointment}
          addedAppointment={activeAppointment.appointment}


        />
        <IntegratedEditing />

        <DayView startDayHour={0} endDayHour={24} />
        <WeekView startDayHour={0} endDayHour={24} />
        <MonthView />

        <Toolbar />
        <DateNavigator />
        <TodayButton />

        <ViewSwitcher />
        <Appointments />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          selectComponent={dropDown}
          textEditorComponent={RemoveComponent}
          booleanEditorComponent={RemoveComponent}
          labelComponent={customizeLabel}
          messages={messages}
        />
      </Scheduler>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        conflictingAppointment={conflictingAppointment}
        handleOverwrite={handleOverwrite}
        title={`Warning ${conflictingAppointment.length} conflict(s) detected`}
        msg="Overwrite conflicting appointment(s)?"
      />
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setActiveDriver,
  setFilteredAppointments,
  setActiveDriverTimeInverval,
  setCsvData,
})(SchedulerComponent);
