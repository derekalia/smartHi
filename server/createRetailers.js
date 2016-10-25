const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createRetailer(retailerName) {
    var retailerDescription="This retailer is one of the best stores in the world. " + retailerName + " is the best. Or is it?"; 
    const parameters = {
        retailerName: retailerName,
        retailerDescription: retailerDescription,
    };

    const query = `($retailerName: String!,$retailerDescription: String!){
        newRetailer:
        createRetailer(
          image:["image1.png"],
          name:$retailerName,
          address:"Seattle,WA",
          description:$retailerDescription,
          rating:3.0,
          ratingCount:[0,0,30,0,0],
        ){id,name}
    }`;

    client.mutate(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}
for (var i=0; i < 10; i++) {
    createRetailer("retailer" + i);
}
