const data=require('../actions/testData.js');
var users = {};
for (var i=0; i < data.TestUsers.length;i++) {
     users[data.TestUsers[i].id] = data.TestUsers[i]; 
}
const testData = {
    users:     users,
    products:  data.TestProducts,
    producers: data.TestProducers,
    retailers: data.TestRetailers,
}
var jsonData = JSON.stringify(testData);
console.log(jsonData);
