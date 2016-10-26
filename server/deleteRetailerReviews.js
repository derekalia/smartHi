const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deleteRetailerReview(retailerReviewId) {
    const parameters = {
        retailerReviewId: retailerReviewId
    };
    const query = `($retailerReviewId: ID!){
        deletedRetailerReview: 
        deleteRetailerReview(id:$retailerReviewId)
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
    allRetailerReviews {
        id,
    }
}`).then( result => {
    var allRetailerReviews = result.allRetailerReviews;
    for (var i=0; i < allRetailerReviews.length; i++) {
         console.log("will delete " + allRetailerReviews[i].id);
         deleteRetailerReview(allRetailerReviews[i].id);
    }
}).catch((error) => {
    console.log(error);
});

