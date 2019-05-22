//TODO: put this in env
const API_KEY = "147b432a97bd3865627524733f213b";
const BASE_URL = "https://api.meetup.com/";
const axios = require("axios");

const findCities = (req, res) => {
  var searchQuery = req.query.query;
  if (searchQuery === undefined || searchQuery === "") {
    return res.send({ error: "query must be defined" });
  }
  var query = `${BASE_URL}2/cities?&sign=true&photo-host=public&query=${searchQuery}&key=${API_KEY}`;

  axios
    .get(query)
    .then(d => res.send(d.data))
    .catch(e => console.log(e));
};

const findTopics = (req, res) => {
  var searchQuery = req.query.query;
  var size = 20;
  if (searchQuery === undefined || searchQuery === "") {
    return res.send({ error: "query must be defined" });
  }
  if (req.query.size !== undefined) {
    size = parseInt(req.query.size);
  }
  searchQuery = searchQuery.split(" ").join("+");
  var query = `${BASE_URL}topics?&sign=true&photo-host=public&search=${searchQuery}&page=${size}&order=name&key=${API_KEY}`;
  axios
    .get(query)
    .then(d => res.send(d.data))
    .catch(e => console.log(e));
};

const findEvents = (req, res) => {
  var lat = -37.810001373291016;
  var lon = 144.9600067138672;
  var size = 20;
  var topic = "";
  var text = "";

  if (req.query.lat !== undefined && req.query.lon !== undefined) {
    lat = req.query.lat;
    lon = req.query.lon;
  }

  size = req.query.size !== undefined ? req.query.size : size;
  topic = req.query.topic !== undefined ? req.query.topic : topic;
  text = req.query.text !== undefined ? req.query.text : text;

  var query = `${BASE_URL}2/open_events?key=${API_KEY}&sign=true&photo-host=public&size=${size}&lat=${lat}&lon=${lon}`;

  if (topic !== "") {
    query += `&topic=${topic}`;
  }

  if (text !== "") {
    query += `&topic=${text}`;
  }

  axios
    .get(query)
    .then(d => res.send(d.data))
    .catch(e => console.log(e));
};

module.exports.findCities = findCities;
module.exports.findTopics = findTopics;
module.exports.findEvents = findEvents;
