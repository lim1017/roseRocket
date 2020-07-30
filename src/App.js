import React from "react";
import Scheduler from "./components/Scheduler";
import DriverProfile from "./components/DriverProfile/DriverProfile";
import { connect } from "react-redux";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Scheduler />
          <h1 style={{display:"flex", justifyContent:"center"}}>Double click to add a task</h1>
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
