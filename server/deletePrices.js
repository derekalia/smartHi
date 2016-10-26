const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deletePrice(priceId) {
    const parameters = {
        priceId: priceId
    };
    const query = `($priceId: ID!){
        deletedPrice: 
        deletePrice(id:$priceId)
        {
            id,
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
    allPrices {
        id,
    }
}`).then( result => {
    var allPrices = result.allPrices;
    for (var i=0; i < allPrices.length; i++) {
         console.log("will delete " + allPrices[i].id);
         deletePrice(allPrices[i].id);
    }
}).catch((error) => {
    console.log(error);
});

