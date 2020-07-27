import React, { useEffect, useState } from "react";
// import "./DriverProfile.css";
import DriverInfoBar from "../DriverInfoBar/DriverInfoBar";
import DriverProfileTable from "../DriverProfileTable";
import PieChart from "../PieChart";
import { connect } from "react-redux";
import { convertData4csv } from "../../helpers/SchedulerHelpers";
import { setCsvData } from "../../actions/";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function DriverProfile(props) {
  const { activeDriver, setCsvData } = props;
  const [taskBreakdown, setTaskBreakdown] = useState({});

  useEffect(() => {
    setTaskBreakdown(convertData4csv(setCsvData, "profile"));
  }, []);

  return (
    <div>
      <DriverInfoBar driver={activeDriver} />
      <DriverProfileTable
        activeDriver={activeDriver}
        taskBreakdown={taskBreakdown}
      />
      <PieChart taskBreakdown={taskBreakdown} />

      <Link to={`/`}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "2em", marginLeft: "2em" }}
        >
          {" "}
          Back
        </Button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { setCsvData })(DriverProfile);
