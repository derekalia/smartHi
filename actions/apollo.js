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
