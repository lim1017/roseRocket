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
