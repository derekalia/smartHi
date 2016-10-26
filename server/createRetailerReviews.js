const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createRetailerReview(retailerId, userId, rating) {
    const parameters = {
        retailerId: retailerId,
        userId: userId,
        rating: rating,
    };
    const query = `($retailerId: ID!,$userId: ID!, $rating: Int!){
        retailerReview:
        createRetailerReview(
            rating: $rating,
            comment: "Some review of this retailer. Currently just placeholder",
            name: "Some review",
            retailerId:$retailerId,
            userId:$userId,
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


var allRetailers = null;
client.query(`{
    allRetailers{ id, name }
}`).then((result)=> {
    allRetailers = result.allRetailers;
    console.log("all retailers first" + allRetailers.length);
    return client.query(`{
        allUsers{ id, name }
    }`);
}).then((result)=> {
    var allUsers = result.allUsers;
    console.log("all users" + allUsers.length);
    for (var i=0; i < allUsers.length; i++) {
        var userId = allUsers[i].id;
        var retailerItems = [];
        for (var j=0; j < 10; j++) {
            var rating = getRandom(0,5);
            var retailerId = allRetailers[getRandom(0,allRetailers.length-1)].id;
            if (!retailerItems.includes(retailerId)) {
                retailerItems.push(retailerId);
                console.log("retailer review " + retailerId + " " + userId);
                createRetailerReview(retailerId,userId,rating);
            }
        }
    }
}).catch(error => {
    console.log(error);
});

