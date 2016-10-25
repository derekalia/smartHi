const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deleteProducer(producerId) {
    const parameters = {
        producerId: producerId
    };
    const query = `($producerId: ID!){
        deletedProducer: 
        deleteProducer(id:$producerId)
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
    allProducers {
        id,
        name,
    }
}`).then( result => {
    var allProducers = result.allProducers;
    for (var i=0; i < allProducers.length; i++) {
         console.log("will delete " + allProducers[i].id);
         deleteProducer(allProducers[i].id);
    }
}).catch((error) => {
    console.log(error);
});

