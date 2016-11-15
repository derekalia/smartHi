const data=require('../actions/testData.js');
const testData = {
    users:     data.TestUsers,
    products:  data.TestProducts,
    producers: data.TestProducers,
    retailers: data.TestRetailers,
}
var jsonData = JSON.stringify(testData);
console.log(jsonData);
