const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function updateProduct(productId) {
    const parameters = {
        productId: productId
    };
    const query = `($productId: ID!){
        updateProduct: 
        updateProduct(id:$productId,activity:"work,hike,eat")
        {
            id,
            name,
            activity,
        },
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
    allProducts {
        id,
        name,
    }
}`).then( result => {
    var allProducts = result.allProducts;
    for (var i=0; i < 20; i++) {
         var index = getRandom(0, allProducts.length-1);
         updateProduct(allProducts[index].id);
    }
}).catch((error) => {
    console.log(error);
});

