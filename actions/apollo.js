import  ApolloClient,{createNetworkInterface} from 'apollo-client';

// Create apollo network interface pointing to the server
const  apolloNetworkInterface =  createNetworkInterface({uri:'https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my'});

// Set apollo network to use a bearer token if possible
apolloNetworkInterface.use([{
    applyMiddleware(request,next) {
        const currentUserToken = null;//GetUserToken();

        if (currentUserToken == null) {
            next();
            return;
        }
        if (!request.options.headers) {
            request.options.headers = new Headers();
        }
        request.options.headers.authorization = `Bearer ${currentUserToken}`;
        next();
    }
}]);

// Create apollo client
const apolloClient = new ApolloClient({
  networkInterface: apolloNetworkInterface,
});

module.exports = apolloClient;

// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


// activity products
const apolloActivityProducts = gql`query($itemId: String!) {
    allProducts(first:20,filter:{activity_contains:$itemId}){
      id,
      name,
      activity,
      rating,
      ratingCount,
      thc,
      cbd,
    }
}`;

// Trend products
const apolloTrendProducts = gql`{
    allProducts(first:2,filter:{trend:None}){
      id,
      name,
      trend,
      activity,
      rating,
      ratingCount,
      thc,
      cbd,
    }
}`;

const apolloProduct = gql`query($itemId: ID!){
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
            retailer {id,name,rating,address,},
        },
        producer {
            id,
            name,
            rating,
            ratingCount,
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

const apolloRetailer = gql`query($itemId: ID!){
    Retailer(id:$itemId)
    {
        id,
        name,
        description,
        image,
        address,
        rating,
        ratingCount,
        products {
            price,
            product {id,name,image,rating,ratingCount,activity,thc,cbd,thca},
        },
        retailerReviews {
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

