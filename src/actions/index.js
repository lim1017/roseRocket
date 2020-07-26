//action create


export const setActiveDriver = (newDriver) =>{
  return {
    type: "setActiveDriver",
    payload: newDriver
  }
}


export const setFilteredAppointments = (newAppointments) =>{
  return {
    type: "setFilteredAppointments",
    payload: newAppointments
  }
}
