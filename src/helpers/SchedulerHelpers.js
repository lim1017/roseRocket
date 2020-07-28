import React from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { appStore } from "../store";

const moment = extendMoment(Moment);

export const RemoveComponent = (props) => {
  return null;
};

export const dropDown = (props) => {
  return <AppointmentForm.Select {...props} />;
};

export const customizeLabel = (props) => {
  if (props.text === "Details") {
    return (
      <AppointmentForm.Label
        text="Time
    "
        type="title"
      />
    );
  }
  return <AppointmentForm.Label {...props} />;
};

export const convertData4csv = (setCsvData, type) => {
  const globalStore = appStore.getState();
  const { filteredAppointments, activeDriverTimeInverval } = globalStore;
  const timeInterval = type === "profile" ? 999 : activeDriverTimeInverval;

  setCsvData([]);
  const finalOP = [];

  let dates = filteredAppointments.map((appointment) =>
    moment(appointment.startDate)
  );
  let firstDate = moment.min(dates);
  let lastDate = moment.max(dates);

  do {
    finalOP.push({
      Date: `${firstDate.format("MM/DD/YYYY")}-${moment(firstDate)
        .add("days", timeInterval - 1)
        .format("MM/DD/YYYY")}`,
      Pickup: 0,
      Dropoff: 0,
      Other: 0,
    });
    firstDate = moment(firstDate).add("days", timeInterval);
  } while (firstDate.isSameOrBefore(lastDate));

  filteredAppointments.forEach((appointment) => {
    let convert2moment = moment(new Date(appointment.startDate)).format(
      "MM/DD/YYYY"
    );

    finalOP.forEach((timeSlot, index) => {
      let split = timeSlot.Date.split("-");
      if (moment(convert2moment).isBetween(split[0], split[1], "days", "[]")) {
        finalOP[index][appointment.title]++;
      }
    });
  });

  setCsvData(finalOP);
  return finalOP;
};

export const commitChanges = (
  added,
  changed,
  deleted,
  setSchedulerState,
  activeDriver
) => {
  setSchedulerState((state) => {
    let { data } = state;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, driver: activeDriver, ...added }];
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

export const checkError = (
  { added, changed, deleted },
  setSchedulerState,
  activeDriver,
  setActiveAppointment,
  filteredAppointments,
  setShowModal,
  setConflictingAppointment
) => {
  if (deleted !== undefined) {
    commitChanges(added, changed, deleted, setSchedulerState, activeDriver);
    return;
  }

  let checkVariable = added ? added : changed[Object.keys(changed)[0]];

  if (
    checkVariable.endDate === "Invalid Date" ||
    checkVariable.startDate === "Invalid Date"
  ) {
    alert("Invalid date");
    return;
  }

  if (changed && checkVariable.endDate) {

    if (
      moment(checkVariable.endDate).isBefore(
        filteredAppointments[Object.keys(changed)[0]].startDate,
        "second"
      )
    ) {
      alert("End date is before start");
      return;
    }

    if (moment(checkVariable.endDate).format("MMM Do YY") !== moment(filteredAppointments[Object.keys(changed)[0]].startDate).format("MMM Do YY")){
      alert("Appointment should not span mutiple days");
      return;
    }
  }

  if (changed && checkVariable.startDate) {
    if (
      moment(checkVariable.startDate).isAfter(
        filteredAppointments[Object.keys(changed)[0]].endDate,
        "second"
      )
    ) {
      alert("Start date is after end");
      return;
    }

    if (moment(checkVariable.startDate).format("MMM Do YY") !== moment(filteredAppointments[Object.keys(changed)[0]].endDate).format("MMM Do YY")){
      alert("Appointment should not span mutiple days");
      return;
    }

  
  }

  if (added && checkVariable.endDate) {
    if (moment(checkVariable.endDate).isBefore(added.startDate, "second")) {
      alert("End date is before start");
      return;
    }

    if (moment(checkVariable.endDate).format("MMM Do YY") !== moment(added.startDate).format("MMM Do YY")){
      alert("Appointment should not span mutiple days");
      return;
    }

  }

  if (added && checkVariable.startDate) {
    if (moment(checkVariable.startDate).isAfter(added.endDate, "second")) {
      alert("Start date is after end");
      return;
    }

    if (moment(checkVariable.startDate).format("MMM Do YY") !== moment(added.endDate).format("MMM Do YY")){
      alert("Appointment should not span mutiple days");
      return;
    }
  }

  checkConflict(
    added,
    changed,
    deleted,
    setSchedulerState,
    activeDriver,
    setActiveAppointment,
    filteredAppointments,
    setShowModal,
    setConflictingAppointment
  );
};

export const checkConflict = (
  added,
  changed,
  deleted,
  setSchedulerState,
  activeDriver,
  setActiveAppointment,
  filteredAppointments,
  setShowModal,
  setConflictingAppointment
) => {
  const appointmentConflicts = [];
  let range;

  if (deleted !== undefined) {
    commitChanges(added, changed, deleted, setSchedulerState, activeDriver);
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

  const removeActiveAppointment = added
    ? filteredAppointments
    : filteredAppointments.filter(
        (appointment) => appointment.id !== chgAppointmentID
      );

  //checks remaining appointment for conflicts and stores any conflicting ones to delete later
  removeActiveAppointment.forEach((appointment) => {
    let range2 = moment.range([appointment.startDate, appointment.endDate]);
    if (range.overlaps(range2)) {
      appointmentConflicts.push(appointment.id);
    }
  });

  //make the appointment if no conflicts otherwise setConflicts
  if (appointmentConflicts.length === 0) {
    commitChanges(added, changed, deleted, setSchedulerState, activeDriver);
  } else {
    setShowModal(true);
    setConflictingAppointment(appointmentConflicts);
  }
};
