const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function addToProducerUser(producerId, userId) {
    const parameters = {
        producerId: producerId,
        userId: userId,
    };
    const query = `($producerId: ID!,$userId: ID!){
        addToProducerUser:
        addToProducerUser(
            producersProducerId:$producerId,
            usersUserId:$userId,
        ){usersUser{id}}
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


var allProducers = null;
client.query(`{
    allProducers{ id, name }
}`).then((result)=> {
    allProducers = result.allProducers;
    console.log("all producers length" + allProducers.length);
    return client.query(`{
        allUsers{ id, name }
    }`);
}).then((result)=> {
    var allUsers = result.allUsers;
    console.log("all users" + allUsers.length);
    for (var i=0; i < allUsers.length; i++) {
        var userId = allUsers[i].id;
        var producerItems = [];
        for (var j=0; j < 10; j++) {
            var producerId = allProducers[getRandom(0,allProducers.length-1)].id;
            if (!producerItems.includes(producerId)) {
                producerItems.push(producerId);
                console.log("producer  user  " + producerId + " " + userId);
                addToProducerUser(producerId,userId);
            }
        }
    }
}).catch(error => {
    console.log(error);
});

