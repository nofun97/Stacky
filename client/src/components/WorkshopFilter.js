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

  handleCityChange = value => {
    // value is object {value: "", label: ""} or can be {value: {}, label: ""}
    this.props.handleCityFilter(value);
  };

  handleTopicChange = value => {
    // value is object {value: "", label: ""} or can be {value: {}, label: ""}
    this.props.handleTopicFilter(value);
  };

  fetchCity = async inputValue => {
    
    var response = await fetch(`/api/meetup/location?query=${inputValue}`);
    var data = await response.json();
    var values = data.results.map(d => {
      return {
        value: {
          lon: d.lon,
          lat: d.lat
        },
        label: d.name_string
      }
    });
    
    return values;
  };

  fetchTopic = async inputValue => {
    var response = await fetch(`/api/meetup/topic?query=${inputValue}`);
    var data = await response.json();
    var values = data.results.map(d => {
      return {
        value: d.urlkey,
        label: d.name
      }
    });
    
    return values;
  };

  render() {
    return (
      <div className={styles.drawer}>
        <div className={styles.citySelect}>
          <h5>Filter by your city</h5>
          <AsyncSelect
            placeholder="Type and select your city here"
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
            placeholder="Type and select your topic here"
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
