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

// products query
const apolloProducts = gql`query($searchCount: Int!,$searchTerm: String!) {
    allProducts(first:$searchCount,filter:{description_contains:$searchTerm}){
      id,
      name,
      image,
      activity,
      rating,
      ratingCount,
      thc,
      cbd,
    }
}`;


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

const apolloProducer = gql`query($itemId: ID!){
    Producer(id:$itemId)
    {
        id,
        name,
        image,
        description,
        rating,
        ratingCount,
        products {
           id,
           name,
           rating,
           ratingCount,
           thc,
           cbd,
           thca,
           activity,
        },
        users {
            id,
            name,
        }
    }
}`;

const apolloLicensee = gql`query($itemId: ID!){
    Retailer(id:$itemId)
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
        users {
            id,
            name,
            image,
        }
    }
}`;

const apolloProcessor = gql`query($itemId: ID!){
    Producer(id:$itemId)
    {
        id,
        name,
        image,
        description,
        rating,
        ratingCount,
        products {
           id,
           name,
           rating,
           ratingCount,
           thc,
           cbd,
           thca,
           activity,
           prices { 
                retailer {id, name, image}
           }
        },
        users {
            id,
            name,
            image,
        }
    }
}`;
 
export async function AddToProductUser(productId,userId) {
    const addToProductUser = gql`
     mutation addToProductUser($productId:ID!,$userId:ID!) {
          addToProductUser(productsProductId: $productId,usersUserId:$userId) {
            usersUser { 
                id,
                name,
            }
          }
     }`;
     try {
        result = await apolloClient.mutate({mutation:addToProductUser,variables:{productId:productId,userId:userId}});
     }
     catch(error) {
        console.log("AddToProductUser:error");
        console.log(error);
     }
}

export async function AddToRetailerUser(retailerId,userId) {
    const addToRetailerUser = gql`
      mutation addToRetailerUser($retailerId:ID!,$userId:ID!) {
          addToRetailerUser(retailersRetailerId: $retailerId,usersUserId:$userId) {
            usersUser { 
                id,
                name,
            }
          }
     }`;
     try {
        result =  await apolloClient.mutate({mutation:addToRetailerUser,variables:{retailerId:retailerId,userId:userId}});
     }
     catch(error) {
        console.log("AddToRetailerUser:error");
        console.log(error);
     }
}

export async function AddToProducerUser(producerId,userId) {
    const addToProducerUser = gql`
      mutation addToProducerUser($producerId:ID!,$userId:ID!) {
          addToProducerUser(producersProducerId: $producerId,usersUserId:$userId) {
            usersUser { 
                id,
                name,
            }
          }
     }`;
     try {
        result =  await apolloClient.mutate({mutation:addToProducerUser,variables:{producerId:producerId,userId:userId}});
     }
     catch(error) {
        console.log("AddToProducerUser:error");
        console.log(error);
     }
}

export async function AddToFollowUser(followingUserId,followerUserId) {
    const addToFollow = gql`
      mutation addToFollow($followingUserId:ID!,$followerUserId:ID!) {
          addToFollow(followingUserId: $followingUserId,followerUserId:$followerUserId) {
            followerUser { 
                id,
                name,
            }
          }
     }`;
     try {
        result =  await apolloClient.mutate({mutation:addToFollow,variables:{followingUserId:followingUserId,followerUserId:followerUserId}});
     }
     catch(error) {
        console.log("AddToFollowUser:error");
        console.log(error);
     }
}
