import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import styles from "../styles/components/WorkshopFilter.module.css";

// Workshop filter based on city and topic
// Use react select async (https://react-select.com/async)
class WorkshopFilter extends Component {
  constructor(props) {
    super(props);
    this.fetchCity = this.fetchCity.bind(this);
    this.fetchTopic = this.fetchTopic.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
  }

  handleCityChange = (value) => {
    // value is object {value: "", label: ""}
    this.props.handleCityFilter(value);
  }

  handleTopicChange = (value) => {
    // value is object {value: "", label: ""}
    this.props.handleTopicFilter(value);
  }

  fetchCity = async inputValue => {
    // input value is a string (ex. "hello")
    // fetch here then return the value of the label and value
    await new Promise(resolve =>
      setTimeout(() => {
        console.log("yahoo");
        resolve();
      }, 5000)
    );
    return [{ value: inputValue, label: inputValue }];
  };

  fetchTopic = async inputValue => {
    // input value is a string (ex. "hello")
    // fetch here then return the value of the label and value
    await new Promise(resolve =>
      setTimeout(() => {
        console.log("yahoo");
        resolve();
      }, 5000)
    );
    return [{ value: inputValue, label: inputValue }];
  };

  render() {
    return (
      <div className={styles.drawer}>
        <div className={styles.citySelect}>
          <h5>Filter by your city</h5>
          <AsyncSelect
            cacheOptions
            value={this.props.filteredCity}
            defaultOptions={[]}
            loadOptions={this.fetchCity}
            onChange={this.handleCityChange}
          />
        </div>
        <div className={styles.topicSelect}>
          <h5>Filter by your topic</h5>
          <AsyncSelect
            cacheOptions
            value={this.props.filteredTopic}
            defaultOptions={[]}
            loadOptions={this.fetchTopic}
            onChange={this.handleTopicChange}
          />
        </div>
      </div>
    );
  }
}

export default WorkshopFilter;
