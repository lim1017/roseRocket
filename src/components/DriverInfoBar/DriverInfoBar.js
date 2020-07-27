import React from "react";
import "./DriverInfoBar.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const faker = require("faker");

function DriverInfoBar(props) {
  // { img, student, index }
  return (
    <Container className="student-container">
      <Row>
        <Col className="avatar-container">
          <img
            className="profile-pic"
            src={faker.image.avatar()}
            // src='https://i.pravatar.cc/300'
            alt="Girl in a jacket"
            width="125px"
            height="125px"
          />
        </Col>
        <Col>
          <Row>
            <div class="student-name">
              <strong>{props.driver} The Truck Driver</strong>{" "}
            </div>
          </Row>
          <Row class="student-bio">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.{" "}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DriverInfoBar;
