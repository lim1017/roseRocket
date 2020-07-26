import React from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

export const tasks = [
  { id: 1, text: "Pickup" },
  { id: 2, text: "Dropoff" },
  { id: 3, text: "Other" },
];

export const drivers = ["Bob", "Tom", "Jane"];

export const timeInterval=[2,4,7,14,28]

export const RemoveComponent = (props) => {
  return null;
};

export const dropDown = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  return <AppointmentForm.Select {...props} />;
};


export const commitChanges = (added, changed, deleted, setSchedulerState, activeDriver) => {
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
