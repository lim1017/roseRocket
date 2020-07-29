//action create

export const setActiveDriver = (newDriver) => {
  return {
    type: "setActiveDriver",
    payload: newDriver,
  };
};

export const setFilteredAppointments = (newAppointments) => {
  return {
    type: "setFilteredAppointments",
    payload: newAppointments,
  };
};

export const setActiveDriverTimeInverval = (newTimeInt) => {
  return {
    type: "setActiveDriverTimeInverval",
    payload: newTimeInt,
  };
};

export const setCsvData = (csvData) => {
  return {
    type: "setCsvData",
    payload: csvData,
  };
};
