var axios = require("axios");

var config = {
  method: "get",
  url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.86639876369186%2C2.346441235774299 &radius=100&type=restaurant&key=key",
  headers: {},
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
