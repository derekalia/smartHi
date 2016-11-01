const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function addToProductUser(productId, userId) {
    const parameters = {
        productId: productId,
        userId: userId,
    };
    const query = `($productId: ID!,$userId: ID!){
        addToProductUser:
        addToProductUser(
            productsProductId:$productId,
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


var allProducts = null;
client.query(`{
    allProducts{ id, name }
}`).then((result)=> {
    allProducts = result.allProducts;
    console.log("all products length" + allProducts.length);
    return client.query(`{
        allUsers{ id, name }
    }`);
}).then((result)=> {
    var allUsers = result.allUsers;
    console.log("all users" + allUsers.length);
    for (var i=0; i < allUsers.length; i++) {
        var userId = allUsers[i].id;
        var productItems = [];
        for (var j=0; j < 10; j++) {
            var productId = allProducts[getRandom(0,allProducts.length-1)].id;
            if (!productItems.includes(productId)) {
                productItems.push(productId);
                console.log("product  user  " + productId + " " + userId);
                addToProductUser(productId,userId);
            }
        }
    }
}).catch(error => {
    console.log(error);
});

