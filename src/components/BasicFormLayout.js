import React, { useState, useEffect } from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { tasks } from '../helpers/SchedulerHelpers'

export const BasicLayout = ({
  onFieldChange,
  appointmentData,
  ...restProps
}) => {

  const [selectedTask, setSelectedTask] = useState(tasks[0])

  const onCustomFieldChange = (nextValue, type) => {
    if (type === "title") {
      onFieldChange({ [type]: tasks[nextValue - 1].text, taskID: nextValue });
      setSelectedTask(tasks[nextValue-1])
    } else onFieldChange({ [type]: nextValue });
  };

  useEffect(() => {
    console.log('useeffect')
    onFieldChange({ title: tasks[0].text, taskID:tasks[0].text.id })
  }, [])
  

  return (
    <div>
      <div style={{ width: "90%", margin: "auto" }}>
        <AppointmentForm.Label text="Select Task" type="title" />
        <AppointmentForm.Select
          value={selectedTask.id}
          onValueChange={(value) => onCustomFieldChange(value, "title")}
          availableOptions={tasks}
          type="filledSelect"
        />

        <AppointmentForm.Label text="Location" type="location" />
        <AppointmentForm.TextEditor
          value={appointmentData.location}
          onValueChange={(value) => onCustomFieldChange(value, "location")}
          placeholder="Location"
          type="noteTextEditor"
        />

        <AppointmentForm.Label text="Notes" type="title" />
        <AppointmentForm.TextEditor
          value={appointmentData.notes}
          onValueChange={(value) => onCustomFieldChange(value, "notes")}
          placeholder="Additional Details"
          type="noteTextEditor"
        />
      </div>

      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      ></AppointmentForm.BasicLayout>
    </div>
  );
};
