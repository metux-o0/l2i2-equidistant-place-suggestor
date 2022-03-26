var axios = require("axios");
const { response } = require("express");

var config = {
  method: "get",
  url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.96203%2C2.53253 &radius=20000&type=restaurant&key=KEY",
  headers: {},
};

axios(config)
  .then(function (response) {
    response.data.results.forEach((element) => {
      console.log(element.name);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
