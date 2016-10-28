const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function GetProduct(itemId) {
    const parameters = {
        itemId: itemId
    };
    const query = `query($itemId: ID!){
    Product(id:$itemId)
    {
        id,
        name,
        image,
        description,
        rating,
        ratingCount,
        productReviews {
            id,
            name,
            comment,
            user {id,name},
            rating
        },
        users {
            id,
            name,
        }
    }
    }`;
       
    client.query(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}
GetProduct("ciuq02rw61ydw01331zhs99av");

