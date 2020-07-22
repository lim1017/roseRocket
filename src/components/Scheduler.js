import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentForm
  
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../demoData/appointments';

import AppointmentFormDetails from './AppointmentFormDetails'


export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date(),

    };
    this.commitChanges = this.commitChanges.bind(this);

  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }



  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={this.state.currentDate}
            defaultCurrentViewName="Week"
          />


          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />


          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />

          <Toolbar />
          <DateNavigator />
          <TodayButton />

          <ViewSwitcher />
          <Appointments />
          <AppointmentForm layoutComponent={AppointmentFormDetails}/>

        </Scheduler>
      </Paper>
    );
  }
}