import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import LocationIcon from "@material-ui/icons/LocationOn";
import styles from "../styles/components/AppointmentExpandable.module.css";

class AppointmentExpandable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleDetail() {
    let open = this.state.open;
    this.setState({
      open: !open,
    });
  }

  // for invite types handler
  handleAccept() {
    this.props.handleAccept();
  }

  // for invite types handler
  handleReject() {
    this.props.handleReject();
  }

  render() {
    let indicator;
    if (this.props.type === "invites") {
      indicator = (
        <div className={styles.indicator}>
          <IconButton style={{width: '20px', height: '20px', padding: '20px', border: "1px black solid" , marginRight:"10px"}} onClick={this.handleAccept}>
            <CheckIcon />
          </IconButton>
          <IconButton style={{width: '20px', height: '20px', padding: '20px', border: "1px black solid"}} onClick={this.handleReject}>
            <CloseIcon />
          </IconButton>
        </div>
      );
    } else {
      indicator = [];
    }
    return (
      <div className={styles.card}>
        <div className={styles.appointment}>
          <div className={styles.label} />
          <div className={styles.summary}>
            <h5>Meeting with {this.props.name}</h5>
            <div className={styles.spaced}>
              <div>
                {this.props.date} {this.props.time}
              </div>
              {indicator}
            </div>

            <div className={styles.spaced}>
              <div>
                <LocationIcon />
                {this.props.address}
              </div>
              <Button onClick={this.handleDetail}>Details</Button>
            </div>
          </div>
        </div>
        <Collapse in={this.state.open}>
          <div>
            <div className={styles.description}>{this.props.description}</div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default AppointmentExpandable;
