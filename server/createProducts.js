const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createProduct(productName, productActivity,producerId) {
    var productDescription="I am high yes I am high. and if you want go get high, get one of these " + productName + " to get high"; 
    const parameters = {
        productName: productName,
        productDescription: productDescription,
        productActivity: productActivity,
        producerId: producerId,
    };
    const query = `($productName: String!,$productDescription: String!, $productActivity: String!, $producerId: ID!){
        newProduct:
        createProduct(
            effect: "happy,50,relaxed,50,stoned,80,"
            effectCount: "happy,50,100,relaxed,50,100,stoned,80,100"
            activity: $productActivity, 
            activityCount: "hike,50,relax,50,sleep,50,",
            symptom: "eye,elbow,something",
            symptomCount: "eye,50,elbow,50,something,50,",
            rating:4.0,
            ratingCount:[0,0,0,30,0]
            ratingFlavorCount:[0,0,0,30,0],
            ratingQualityCount:[0,0,0,30,0],
            ratingPotencyCount:[0,0,0,30,0],
            thc:2.4,
            thca:4.5,
            cbd:7.8,
            name: $productName,
            image:["image1.png","image2.png"],
            description: $productDescription,
            producerId: $producerId,
        ){id,name}
    }`;

    client.mutate(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.query(`{
    allProducers{ id, name }
}`).then((result)=> {
    var allProducers = result.allProducers;
    console.log("got producers");
    for (var i=0; i < 100; i++) {
        var producerIndex = getRandom(0,allProducers.length-1);
        console.log("linking to producer " + allProducers[producerIndex].name);
        createProduct("product" + i,"relax,sleep,chill",allProducers[producerIndex].id);
    }
});
