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
          <IconButton style={{width: '20px', height: '20px', padding: '20px', border: "2px #FF9C40 solid" , marginRight:"10px"}} onClick={this.handleAccept}>
            <CheckIcon style ={{position:"absolute", color:"#FF9C40"}}/>
          </IconButton>
          <IconButton style={{width: '20px', height: '20px', padding: '20px', border: "2px #FF9C40 solid"}} onClick={this.handleReject}>
            <CloseIcon style ={{position:"absolute", color:"#FF9C40"}} />
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
            <h5 className={styles.card_heading}>Meeting with {this.props.name}</h5>
            <div className={styles.spaced}>
              <div className={styles.card_details}>
                {this.props.date} {this.props.time}
              </div>
              {indicator}
            </div>

            <div className={styles.spaced}>
              <div className={styles.address}>
                <LocationIcon />
                {this.props.address}
              </div>
              <Button className={styles.address} onClick={this.handleDetail}>Details</Button>
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