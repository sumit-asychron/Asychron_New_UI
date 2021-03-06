import React, { Component } from "react";
import "../../../shared/CSS/FormStyles.css";
import Roles from "./Roles";
import Activities from "./Activities";
import Users from "./Users";
import "./UsersManagement.css";
import { Col } from "reactstrap";

class UsersManagement extends Component {
  render() {
    return (
      <div className="jumbotron jumbo-form">
        <div className="row educations">
          <Col>
            <h5 className="page-heading"> User Management </h5>
          </Col>
        </div>
        <hr className="hr-line" />

        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card hiring">
              <div className="card-body hiring">
                <ul className="nav nav-pills bg-nav-pills nav-justified mb-6 hiring">
                  <li className="nav-item">
                    <a
                      href="#users"
                      data-bs-toggle="tab"
                      aria-expanded="true"
                      className="nav-link rounded-0 active hiring"
                    >
                      Users
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#roles"
                      data-bs-toggle="tab"
                      aria-expanded="false"
                      className="nav-link rounded-0  hiring"
                    >
                      Roles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#activities"
                      data-bs-toggle="tab"
                      aria-expanded="false"
                      className="nav-link rounded-0 hiring"
                    >
                      Activities
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* ==========================Users==================== */}
                  <div className="tab-pane active" id="users">
                    <Users />
                  </div>

                  {/* ==========================Roles==================== */}
                  <div className="tab-pane" id="roles">
                    <Roles />
                  </div>

                  {/* ==========================Activities==================== */}
                  <div className="tab-pane" id="activities">
                    <Activities />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersManagement;
