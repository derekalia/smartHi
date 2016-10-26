const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createPrice(productId, retailerId, price) {
    const parameters = {
        productId: productId,
        retailerId: retailerId,
        price: price,
    };

    const query = `($productId: ID!,$retailerId: ID!, $price: BigDecimal!){
        newPrice:
        createPrice(
            productId: $productId,
            retailerId: $retailerId,
            price: $price,
        ){id,price}
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
        allRetailers{ id, name }
    }`);
}).then((result)=> {
    var allRetailers = result.allRetailers;
    console.log("all products" + allProducts.length);
    console.log("all retailers" + allRetailers.length);
    for (var i=0; i < allRetailers.length; i++) {
        var retailerId = allRetailers[i].id;
        var retailerItems = [];
        for (var j=0; j < 20; j++) {
            var price = getRandom(10,100) + 0.0;
            var productId = allProducts[getRandom(0,allProducts.length-1)].id;
            if (!retailerItems.includes(productId)) {
                retailerItems.push(productId);
                createPrice(productId,retailerId,price);
            }
        }
    }
}).catch(error => {
    console.log(error);
});
