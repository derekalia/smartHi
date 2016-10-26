const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deleteProductReview(productReviewId) {
    const parameters = {
        productReviewId: productReviewId
    };
    const query = `($productReviewId: ID!){
        deletedProductReview: 
        deleteProductReview(id:$productReviewId)
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
    allProductReviews {
        id,
    }
}`).then( result => {
    var allProductReviews = result.allProductReviews;
    for (var i=0; i < allProductReviews.length; i++) {
         console.log("will delete " + allProductReviews[i].id);
         deleteProductReview(allProductReviews[i].id);
    }
}).catch((error) => {
    console.log(error);
});

