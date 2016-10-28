const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

/*
    id:'0',
    name:'test name',
    description:'test description.',
    price: 39.99,
    rating: 3.5,
    ratingCount: 323,
    quality: 3,
    flavor: 4,
    potency:5,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',
    symptom:['one','two','three'],
    activity:['social','exercise','work'],
    effect:[{name:'energetic',strength:190},{name:'giggly',strength:50},{name:'relaxed',strength:60}]},
*/

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
        thc,
        cbd,
        thca,
        quality,
        flavor,
        potency,
        prices {
            price,
            retailer { id, name, rating}
        },
        producer {
            id
        }, 
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
        var prices = result.Product.prices;
        for (var i=0; i < prices.length; i++) {
            console.log(prices[i]);
        }
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}
GetProduct("ciuq02rw61ydw01331zhs99av");

