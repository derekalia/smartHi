const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deleteProduct(productId) {
    const parameters = {
        productId: productId
    };
    const query = `($productId: ID!){
        deletedProduct: 
        deleteProduct(id:$productId)
        {
            id,
            name,
        },
    }`;

    client.mutate(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}

client.query(`{
    allProducts {
        id,
        name,
    }
}`).then( result => {
    var allProducts = result.allProducts;
    for (var i=0; i < allProducts.length; i++) {
         console.log("will delete " + allProducts[i].id);
         deleteProduct(allProducts[i].id);
    }
}).catch((error) => {
    console.log(error);
});

