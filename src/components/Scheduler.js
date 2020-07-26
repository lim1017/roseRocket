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
import Moment from "moment";
import { extendMoment } from "moment-range";
import { CSVLink } from "react-csv";

import DropDown from "./DropDown/DropDown";
import Header from "./Header"
import Modal from "./Modal";
import { BasicLayout } from "./BasicFormLayout";
import {
  RemoveComponent,
  drivers,
  dropDown,
  timeInterval,
  checkError,
  commitChanges
} from "../helpers/SchedulerHelpers";


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

  const [activeDriver, setActiveDriver] = useState(drivers[0]);
  const [activeDriverTimeInverval, setActiveDriverTimeInverval] = useState(
    timeInterval[0]
  );

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [conflictingAppointment, setConflictingAppointment] = useState([]);
  const [activeAppointment, setActiveAppointment] = useState({
    appointment: null,
    chgType: null,
  });

  // const checkErrors = ({ added, changed, deleted },setSchedulerState, activeDriver) => {
  //   let checkVariable = added ? added : changed[0]
  
  //   if (checkVariable.endDate == "Invalid Date" || checkVariable.startDate == "Invalid Date"){
  //     alert('Invalid date')
  //     return
  //   }
  
  //   checkConflict(added, changed, deleted, setSchedulerState, activeDriver)
  // }
  

  // const checkConflict = (added, changed, deleted, setSchedulerState, activeDriver) => {
  //   const appointmentConflicts = [];
  //   let range;

  //   console.log('inside check')


  //   if (deleted !== undefined) {
  //     commitChanges(added, changed, deleted, setSchedulerState, activeDriver);
  //     return;
  //   }

  //   if (added) {
  //     setActiveAppointment({ appointment: added, chgType: "added" });
  //     range = moment.range([added.startDate, added.endDate]);
  //   }

  //   if (changed) {
  //     setActiveAppointment({ appointment: changed, chgType: "changed" });
  //     var chgAppointmentID = parseInt(Object.keys(changed)[0]);
  //     let chgAppointment = filteredAppointments.filter(
  //       (appointment) => appointment.id === chgAppointmentID
  //     );

  //     let start = changed[chgAppointmentID].startDate
  //       ? changed[chgAppointmentID].startDate
  //       : chgAppointment[0].startDate;
  //     let end = changed[chgAppointmentID].endDate
  //       ? changed[chgAppointmentID].endDate
  //       : chgAppointment[0].endDate;

  //     range = moment.range([start, end]);
  //   }

  //   //if editing remove that appointment from list so no conflict
  //   const refilteredAppointments = added
  //     ? filteredAppointments
  //     : filteredAppointments.filter(
  //         (appointment) => appointment.id !== chgAppointmentID
  //       );

  //   //checks remaining appointment for conflicts and adds them to an []
  //   refilteredAppointments.forEach((appointment) => {
  //     let range2 = moment.range([appointment.startDate, appointment.endDate]);
  //     console.log(range2);
  //     if (range.overlaps(range2)) {
  //       appointmentConflicts.push(appointment.id);
  //     }
  //   });

  //   //make the appointment if no conflicts otherwise setConflicts
  //   if (appointmentConflicts.length === 0) {
  //     commitChanges(added, changed, deleted, setSchedulerState, activeDriver);
  //   } else {
  //     setShowModal(true);
  //     setConflictingAppointment(appointmentConflicts);
  //   }
  // };

  // const commitChanges = (added, changed, deleted) => {
  //   setSchedulerState((state) => {
  //     console.log(state);
  //     let { data } = state;
  //     if (added) {
  //       const startingAddedId =
  //         data.length > 0 ? data[data.length - 1].id + 1 : 0;
  //       data = [
  //         ...data,
  //         { id: startingAddedId, driver: activeDriver, ...added },
  //       ];
  //     }
  //     if (changed) {
  //       data = data.map((appointment) =>
  //         changed[appointment.id]
  //           ? { ...appointment, ...changed[appointment.id] }
  //           : appointment
  //       );
  //     }
  //     if (deleted !== undefined) {
  //       data = data.filter((appointment) => appointment.id !== deleted);
  //     }
  //     return { data };
  //   });
  // };

  const handleOverwrite = () => {
    //deletes old conflicting appointments
    conflictingAppointment.forEach((conflict) => {
      commitChanges(undefined, undefined, conflict, setSchedulerState, activeDriver);
    });
    setConflictingAppointment([]);

    if (activeAppointment.chgType === "changed") {
      commitChanges(undefined, activeAppointment.appointment, undefined, setSchedulerState, activeDriver);
    } else if (activeAppointment.chgType === "added") {
      commitChanges(activeAppointment.appointment, undefined, undefined, setSchedulerState, activeDriver);
    }
  };

  useEffect(() => {
    const filteredAppointments = schedulerState.data.filter(
      (appointment) => appointment.driver === activeDriver
    );

    setFilteredAppointments(filteredAppointments);
  }, [activeDriver, schedulerState]);

  const convertData4csv = () => {
    setCsvData([]);
    const finalOP = [];

    let dates = filteredAppointments.map((appointment) =>
      moment(appointment.startDate)
    );
    let firstDate = moment.min(dates);
    let lastDate = moment.max(dates);

    // finalOP.push({Driver:activeDriver, interval:activeDriverTimeInverval})

    do {
      finalOP.push({
        Date: `${firstDate.format("MM/DD/YYYY")}-${moment(firstDate)
          .add("days", activeDriverTimeInverval - 1)
          .format("MM/DD/YYYY")}`,
        Pickup: 0,
        Dropoff: 0,
        Other: 0,
      });
      firstDate = moment(firstDate).add("days", activeDriverTimeInverval);
    } while (firstDate.isBefore(lastDate));

    filteredAppointments.forEach((appointment) => {
      let convert2moment = moment(new Date(appointment.startDate)).format(
        "MM/DD/YYYY"
      );

      // finalOP.slice(1)
      finalOP.forEach((timeSlot, index) => {
        let split = timeSlot.Date.split("-");
        if (
          moment(convert2moment).isBetween(split[0], split[1], "days", "[]")
        ) {
          finalOP[index][appointment.title]++;
        }
      });
    });

    setCsvData(finalOP);
    return finalOP;
  };

  return (
    <Paper>
      <Header activeDriver={activeDriver} setActiveDriver={setActiveDriver} activeDriverTimeInverval={activeDriverTimeInverval} setActiveDriverTimeInverval={setActiveDriverTimeInverval} csvData={csvData} convertData4csv={convertData4csv} />
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DropDown
          options={drivers}
          type="Driver"
          active={activeDriver}
          setActive={setActiveDriver}
          testID="driverDropdown"
        />
        <div>
          <DropDown
            options={timeInterval}
            type="Time Interval"
            active={activeDriverTimeInverval}
            setActive={setActiveDriverTimeInverval}
            testID="timeIntervalDropdown"
          />
          <button
            style={{ height: "30px", marginTop: "2em", marginRight: "2em" }}
          >
            <CSVLink
              data={csvData}
              asyncOnClick={true}
              onClick={() => convertData4csv()}
              filename={`${activeDriver}${activeDriverTimeInverval}interval.csv`}
            >
              Download Driver Tasks
            </CSVLink>
          </button>
        </div> 
      </div>*/}

      <Scheduler data={filteredAppointments} height={760}>
        <ViewState
          defaultCurrentDate={schedulerState.currentDate}
          defaultCurrentViewName="Week"
        />

        <EditingState onCommitChanges={(chgType)=>checkError(chgType, setSchedulerState, activeDriver, setActiveAppointment, filteredAppointments, setShowModal, setConflictingAppointment)} />
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
        handleOverwrite={handleOverwrite}
        title={`Warning ${conflictingAppointment.length} conflict(s) detected`}
        msg="Overwrite conflicting appointment(s)?"
        />
    </Paper>
  );
};

export default SchedulerComponent;
