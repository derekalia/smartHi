const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createProducer(producerName) {
    var producerDescription="This producer is one of the best producers in the world. " + producerName + " is the best. Or is it?"; 
    const parameters = {
        producerName: producerName,
        producerDescription: producerDescription,
    };
    const query = `($producerName: String!,$producerDescription: String!){
        newProducer:
        createProducer(
          image:["image1.png"],
          name:$producerName,
          description:$producerDescription,
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
for (var i=0; i < 5; i++) {
    createProducer("producer" + i);
}
