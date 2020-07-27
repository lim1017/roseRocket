import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import DropDown from "./DropDown/DropDown";
import { drivers, timeInterval } from "../data/data";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  text: {
    color: "white",
  },
}));

const Header = (props) => {
  const {
    activeDriver,
    setActiveDriver,
    activeDriverTimeInverval,
    setActiveDriverTimeInverval,
    csvData,
    setCsvData,
    convertData4csv,
  } = props;

  const classes = useStyles();

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
        <Link to={`/profile/${activeDriver}`}>
          <Button
            variant="contained"
            color="primary"
            style={{ height: "40px", marginTop: "2em", marginLeft: "0.2em" }}
            // onClick={() => props.history.push(`/profile/${activeDriver}`)}
          >
            Driver Profile
          </Button>
        </Link>
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ height: "40px", marginTop: "2em", marginRight: "0.2em" }}
        >
          <CSVLink
            className={classes.text}
            data={csvData}
            asyncOnClick={true}
            onClick={() => convertData4csv(setCsvData)}
            filename={`${activeDriver}${activeDriverTimeInverval}interval.csv`}
          >
            Download Driver Tasks
          </CSVLink>
        </Button>
        <DropDown
          options={timeInterval}
          type="Time Interval"
          active={activeDriverTimeInverval}
          setActive={setActiveDriverTimeInverval}
          testID="timeIntervalDropdown"
        />
      </div>
    </div>
  );
};

export default withRouter(Header);
