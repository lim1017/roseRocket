import React from "react";
import { CSVLink } from "react-csv";
import DropDown from "./DropDown/DropDown";
import { drivers, timeInterval } from "../data/data";

const Header = ({
  activeDriver,
  setActiveDriver,
  activeDriverTimeInverval,
  setActiveDriverTimeInverval,
  csvData,
  convertData4csv,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
      <DropDown
        options={drivers}
        type="Driver"
        active={activeDriver}
        setActive={setActiveDriver}
        testID="driverDropdown"
      />
      <button style={{ height: "30px", marginTop: "2em", marginLeft: "0.2em" }}>Driver Profile</button>
      </div>

      <div>
        <DropDown
          options={timeInterval}
          type="Time Interval"
          active={activeDriverTimeInverval}
          setActive={setActiveDriverTimeInverval}
          testID="timeIntervalDropdown"
        />
        <button
          style={{ height: "30px", marginTop: "2em", marginRight: "2em" }}
        >
          <CSVLink
            data={csvData}
            asyncOnClick={true}
            onClick={() => convertData4csv()}
            filename={`${activeDriver}${activeDriverTimeInverval}interval.csv`}
          >
            Download Driver Tasks
          </CSVLink>
        </button>
      </div>
    </div>
  );
};

export default Header;
