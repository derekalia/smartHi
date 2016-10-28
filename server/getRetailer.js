const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function GetRetailer(retailerId) {
    const parameters = {
        retailerId: retailerId
    };
    const query = `query($retailerId: ID!){
        Retailer(id:$retailerId)
        {
            id,
            name,
            image,
            address,
            rating,
            ratingCount,
            products {
                price,
                product {id,name,image,rating,ratingCount},
            },
            retailerReviews {
                id,
                name,
                comment,
                user {id,name},
                rating
            },
        }
    }`;

    client.query(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}
GetRetailer("ciuovqxwnq0s20133thkfjgzt");

