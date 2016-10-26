const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createProductReview(productId, userId, rating) {
    const parameters = {
        productId: productId,
        userId: userId,
        rating: rating,
    };
    const query = `($productId: ID!,$userId: ID!, $rating: Int!){
        productReview:
        createProductReview(
            quality: 3,
            name: "Some review",
            flavor: 3,
            activity: "hike,sleep,relax",
            potency: 3,
            rating: $rating,
            comment: "This is just a placeholder for the review",
            effect:"sleepy,90,relaxed:30,chill,50,happy,60",
            symptom:"sleepy,relaxed,chill,happy",
            userId:$userId,
            productId:$productId,
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


var allProducts = null;
client.query(`{
    allProducts{ id, name }
}`).then((result)=> {
    allProducts = result.allProducts;
    console.log("all products first" + allProducts.length);
    return client.query(`{
        allUsers{ id, name }
    }`);
}).then((result)=> {
    var allUsers = result.allUsers;
    console.log("all products" + allProducts.length);
    console.log("all users" + allUsers.length);
    for (var i=0; i < allUsers.length; i++) {
        var userId = allUsers[i].id;
        var productItems = [];
        for (var j=0; j < 10; j++) {
            var rating = getRandom(0,5);
            var productId = allProducts[getRandom(0,allProducts.length-1)].id;
            if (!productItems.includes(productId)) {
                productItems.push(productId);
                createProductReview(productId,userId,rating);
            }
        }
    }
}).catch(error => {
    console.log(error);
});

