const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deleteRetailer(retailerId) {
    const parameters = {
        retailerId: retailerId
    };
    const query = `($retailerId: ID!){
        deletedRetailer: 
        deleteRetailer(id:$retailerId)
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
    allRetailers {
        id,
        name,
    }
}`).then( result => {
    var allRetailers = result.allRetailers;
    for (var i=0; i < allRetailers.length; i++) {
         console.log("will delete " + allRetailers[i].id);
         deleteRetailer(allRetailers[i].id);
    }
}).catch((error) => {
    console.log(error);
});

