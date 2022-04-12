var axios = require('axios');

axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&locationbias=circle%3A2000%4048.86380957985594%2C2.3443822975053807&fields=opening_hours&key=KEY')
.then(function (response) {
  console.log(JSON.stringify(response.data));
})