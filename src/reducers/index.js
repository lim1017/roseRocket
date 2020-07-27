import { combineReducers } from 'redux';
import { drivers, timeInterval } from '../data/data'

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


const activeDriverTimeInvervalReducer = (activeDriverTimeInverval = timeInterval[0], action ) =>{
  if (action.type === "setActiveDriverTimeInverval"){
    return action.payload
  }

  return activeDriverTimeInverval
}

const csvDataReducer = (csvData = [], action ) =>{
  if (action.type === "setCsvData"){
    return action.payload
  }

  return csvData
}

export default combineReducers({
  activeDriver: activeDriverReducer,
  filteredAppointments: filteredAppointmentsReducer,
  activeDriverTimeInverval: activeDriverTimeInvervalReducer,
  csvData: csvDataReducer
})