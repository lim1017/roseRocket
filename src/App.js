import React from "react";
import Scheduler from "./components/Scheduler";
import DriverProfile from "./components/DriverProfile/DriverProfile";
import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Scheduler />
        </Route>

        <Route path={`/profile/:driver`}>
          <DriverProfile />
        </Route>
      </Switch>

      <div className="App"></div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
