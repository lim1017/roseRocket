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
import DropDown from "./DropDown"

import { RemoveComponent, tasks, drivers } from '../helpers/SchedulerHelpers'

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);


// next to work on conflicting times
//check line 101  compare .startdate/.enddate
//look for library to check for conflicting time interval
// https://stackoverflow.com/questions/40970369/use-momentjs-to-check-if-this-time-range-is-conflict-with-other-time-range
const messages = {
  moreInformationLabel: "",
};



const dropDown = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  return <AppointmentForm.Select {...props} />;
};


const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue, type) => {
    if (type === "title") {
      onFieldChange({ [type]: tasks[nextValue - 1].text, taskID: nextValue });
    } else onFieldChange({ [type]: nextValue });
  };

  return (
    <div>
      <div style={{ width: "90%", margin: "auto" }}>
        <AppointmentForm.Label text="Select Task" type="title" />
        <AppointmentForm.Select
          value={appointmentData.taskID}
          onValueChange={(value) => onCustomFieldChange(value, "title")}
          availableOptions={tasks}
          type="outlinedSelect"
        />

        <AppointmentForm.Label text="Location" type="location" />
        <AppointmentForm.TextEditor
          value={appointmentData.notes}
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


const SchedulerComponent = () => {
  const [schedulerState, setSchedulerState] = useState({
    data: [],
    currentDate: new Date(),
  });

  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [activeDriver, setActiveDriver] = useState(drivers[0])

  const commitChanges = ({ added, changed, deleted }) => {
    console.log(added)
    console.log(added.startDate)

    let range = moment.range([added.startDate, added.endDate])
    console.log(range)

    //check for conflicts
    filteredAppointments.forEach(appointment =>{
      console.log(appointment)
      let range2 = moment.range([appointment.startDate, appointment.endDate])
      if(range.overlaps(range2)){
        alert('conflict!')
      }
    })


    setSchedulerState((state) => { 
      console.log(state)
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


  useEffect(() => {
    const filteredAppointments=schedulerState.data.filter(appointment =>appointment.driver == activeDriver)

    setFilteredAppointments(filteredAppointments)

  }, [activeDriver, schedulerState])

  // console.log(schedulerState)
  // console.log(filteredAppointments)

  return (
    <Paper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DropDown drivers={drivers} type="Driver" activeDriver={activeDriver} setActiveDriver={setActiveDriver} />
        <button>download driver</button>
      </div>

      <Scheduler data={filteredAppointments} height={660}>
        <ViewState
          defaultCurrentDate={schedulerState.currentDate}
          defaultCurrentViewName="Week"
        />

        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />

        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={10} endDayHour={19} />
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
    </Paper>
  );
};

export default SchedulerComponent;
