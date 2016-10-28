const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function updateProduct(productId,thc,cbd) {
    const parameters = {
        productId: productId,
        thc: thc,
        cbd: cbd,
    };
    const query = `($productId: ID!,$thc:BigDecimal!,$cbd:BigDecimal!){
        updateProduct: 
        updateProduct(id:$productId,thc:$thc,cbd:$cbd)
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
    for (var i=0; i < allProducts.length; i++) {
         var thc = getRandom(0, 50);
         var cbd = getRandom(0, 50);
         updateProduct(allProducts[i].id,thc,cbd);
    }
}).catch((error) => {
    console.log(error);
});

