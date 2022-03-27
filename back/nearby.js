const router = require('express').Router();
const axios = require('axios');
const key = process.env.REACT_APP_GOOGGLE_API_KEY;

router.post('/formulaire', async (req, res) => {
  var tab_pers = req.body.tab1;
  const dateChoisie = req.body.dateChoisie;
  const tab_lieu=[];
  try {
    axios
      .get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
          48.8 +
          '%2C' +
          2.3 +
          '&radius=1000&keyword=restaurant&pagetoken&type=restaurant&key=AIzaSyAgbMy2V7CQz70IiqR1jgiybeEmU6tnkNk'
      )
      .then(function (response) {
        response.data.results.forEach((element) => {
          console.log(JSON.stringify(element.name));
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
