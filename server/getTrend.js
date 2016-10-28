const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function GetTrend() {
    const query = `query{
        allProducts(first:2,filter:{trend:None})
        {
            id,
            name,
            image,
            rating,
            ratingCount,
        }
    }`;

    client.query(query).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}
GetTrend();

