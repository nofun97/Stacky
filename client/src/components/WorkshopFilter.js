import React, { Component } from "react";
import Select from "react-select";
import styles from "../styles/components/WorkshopFilter.module.css";

class WorkshopFilter extends Component {
  render() {
    return (
      <div className={styles.drawer}>
        <section className={styles.listing}>
          <h1>Select category to filter:</h1>
          <Select
            className={styles.select}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="category"
          />
        </section>
      </div>
    );
  }
}

export default WorkshopFilter;
