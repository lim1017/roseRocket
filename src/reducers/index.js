import { combineReducers } from 'redux';
import { drivers } from '../data/data'

//reducers

const activeDriverReducer = (activeDriver = drivers[0], action ) =>{
  if (action.type === "setActiveDriver"){
    return action.payload
  }

  return activeDriver
}

const filteredAppointmentsReducer = (filteredAppointments = [], action ) =>{
  if (action.type === "setFilteredAppointments"){
    return action.payload
  }

  return filteredAppointments
}

export default combineReducers({
  activeDriver: activeDriverReducer,
  filteredAppointments: filteredAppointmentsReducer
})