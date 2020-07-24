import React, { useState, useEffect } from "react";
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
import DropDown from "./DropDown";
import Modal from "./Modal";

import {
  RemoveComponent,
  drivers,
  dropDown,
} from "../helpers/SchedulerHelpers";
import { BasicLayout } from "./BasicFormLayout";

import Moment from "moment";
import { extendMoment } from "moment-range";

//Part A seems to be done.  next step is to get the csv working.  Check:
// https://stackoverflow.com/questions/48760815/export-to-csv-button-in-react-table

const moment = extendMoment(Moment);

const messages = {
  moreInformationLabel: "",
};

const SchedulerComponent = () => {
  const [schedulerState, setSchedulerState] = useState({
    data: [],
    currentDate: new Date(),
  });

  const [showModal, setShowModal] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [activeDriver, setActiveDriver] = useState(drivers[0]);
  const [conflictingAppointment, setConflictingAppointment] = useState([]);
  const [activeAppointment, setActiveAppointment] = useState({
    appointment: null,
    chgType: null,
  });

  const checkConflict = ({ added, changed, deleted }) => {
    let conflictFlag = false;
    const appointmentConflicts=[]
    let range;

    if (deleted !== undefined) {
      console.log(deleted);
      commitChanges(added, changed, deleted);
      return;
    }

    if (added) {
      setActiveAppointment({ appointment: added, chgType: "added" });
      range = moment.range([added.startDate, added.endDate]);
    }

    if (changed) {
      setActiveAppointment({ appointment: changed, chgType: "changed" });
      var chgAppointmentID = parseInt(Object.keys(changed)[0]);
      let chgAppointment = filteredAppointments.filter(
        (appointment) => appointment.id === chgAppointmentID
      );

      let start = changed[chgAppointmentID].startDate
        ? changed[chgAppointmentID].startDate
        : chgAppointment[0].startDate;
      let end = changed[chgAppointmentID].endDate
        ? changed[chgAppointmentID].endDate
        : chgAppointment[0].endDate;

      range = moment.range([start, end]);
    }

    
    //if editing remove that appointment from list so no conflict
    const refilteredAppointments = added
      ? filteredAppointments
      : filteredAppointments.filter(
          (appointment) => appointment.id !== chgAppointmentID
        );

    //checks remaining appointment for conflicts and adds them to an []
    refilteredAppointments.forEach((appointment) => {
      let range2 = moment.range([appointment.startDate, appointment.endDate]);
      console.log(range2);
      if (range.overlaps(range2)) {
        appointmentConflicts.push(appointment.id)
      }
    });

    //make the appointment if no conflicts otherwise setConflicts
    if (appointmentConflicts.length === 0) {
      commitChanges(added, changed, deleted);
    } else {
      setShowModal(true);
      setConflictingAppointment(appointmentConflicts)
    }
  };

  const commitChanges = (added, changed, deleted) => {
    setSchedulerState((state) => {
      console.log(state);
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [
          ...data,
          { id: startingAddedId, driver: activeDriver, ...added },
        ];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  };

  const handleOverwrite = () => {
    //deletes old conflicting appointments
    conflictingAppointment.forEach(conflict =>{
      commitChanges(undefined, undefined, conflict);
    })
    setConflictingAppointment([])


    if (activeAppointment.chgType === "changed") {
      commitChanges(undefined, activeAppointment.appointment, undefined);
    } else if (activeAppointment.chgType === "added") {
      commitChanges(activeAppointment.appointment, undefined, undefined);
    }
  };

  useEffect(() => {
    const filteredAppointments = schedulerState.data.filter(
      (appointment) => appointment.driver === activeDriver
    );

    setFilteredAppointments(filteredAppointments);
  }, [activeDriver, schedulerState]);

  return (
    <Paper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DropDown
          drivers={drivers}
          type="Driver"
          activeDriver={activeDriver}
          setActiveDriver={setActiveDriver}
        />
        <button style={{height:"30px", marginTop:"2em", marginRight:"2em"}}>Download Driver Schedule</button>
      </div>

      <Scheduler data={filteredAppointments} height={760}>
        <ViewState
          defaultCurrentDate={schedulerState.currentDate}
          defaultCurrentViewName="Week"
        />

        <EditingState onCommitChanges={checkConflict} />
        <IntegratedEditing />

        <DayView startDayHour={0} endDayHour={24} />
        <WeekView startDayHour={0} endDayHour={24} />
        <MonthView startDayHour={10} endDayHour={19} />

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
          messages={messages}
        />
      </Scheduler>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        conflictingAppointment={conflictingAppointment}
        commitChanges={commitChanges}
        handleOverwrite={handleOverwrite}
      />
    </Paper>
  );
};

export default SchedulerComponent;
