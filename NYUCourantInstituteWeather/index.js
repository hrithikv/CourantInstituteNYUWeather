'use strict';
const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

const axios = require('axios');

const API_KEY = process.env.API_KEY;
const COORDS = process.env.COORDS;
const TOPIC = process.env.TOPIC;

exports.handler = (event, context, callback) => {
  const weatherURL = `https://api.darksky.net/forecast/${API_KEY}/${COORDS}?exclude=currently,minutely,hourly,flags`;

  axios.get(weatherURL).then((response) => {
    const tomorrow = response.data.daily.data[1];
    const high = Math.round(tomorrow.temperatureHigh);
    const low = Math.round(tomorrow.temperatureLow);
    const precip = Math.round(tomorrow.precipProbability * 100);
    const summary = tomorrow.summary;

    const message = `Tomorrow's weather: \nHi: ${high}\xB0\nLo: ${low}\xB0\nRain: ${precip}%\n\n${summary}`;

    const params = {
      Message: message,
      TopicArn: TOPIC
    }

    SNS.publish(params, (err, data) => {
      if (err) {
        console.log(err.stack);
        callback(err);
      }
      callback(null, data);
    })
  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      callback('Unable to connect to API servers');
    }
    else {
      callback(e.message);
    }
  });
};
