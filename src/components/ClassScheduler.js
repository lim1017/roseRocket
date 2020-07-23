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



const messages = {
  moreInformationLabel: '',
};

const tasks=[{id:1, text:'Pickup'}, {id:2, text:'Dropoff'}, {id:3, text:'Other'}]

const SelectProps = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
 return <AppointmentForm.Select {...props} />;
};

const RemoveComponent = (props) =>{
  return null
}

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue, type) => {

    if (type === "title"){
      onFieldChange({ [type]: tasks[nextValue-1].text, taskID: nextValue });  
    } else onFieldChange({ [type]: nextValue });
  };

  return (
    <div>
      <div style={{width:"90%", margin:"auto"}}>
      <AppointmentForm.Label
        text="Select Task"
        type="title"
      />
      <AppointmentForm.Select
        value={appointmentData.taskID}
        onValueChange={(value)=>onCustomFieldChange(value, "title")}
        availableOptions={tasks}
        type="outlinedSelect"
      />

      <AppointmentForm.Label
        text="Notes"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.notes}
        onValueChange={(value)=>onCustomFieldChange(value, "notes")}
        placeholder="Optional"
        type="noteTextEditor"
      />
      </div>
      
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      
    </AppointmentForm.BasicLayout>
    </div>
  );
};



export default class SchedulerComponent extends React.PureComponent {
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
    console.log(this.state.data)

    return (
      <Paper>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <button>chg driver</button>
          <button>download driver</button>
        </div>
                

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
          {/* <AppointmentForm layoutComponent={AppointmentFormDetails}/> */}
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            selectComponent={SelectProps}
            textEditorComponent={RemoveComponent}
            booleanEditorComponent={RemoveComponent}
            // labelComponent={RemoveComponent}
            messages={messages}
          />
        </Scheduler>
      </Paper>
    );
  }
}