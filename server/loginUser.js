const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function loginUser(userName,userPassword) {
    const parameters = {
        userName: userName,
        userPassword: userPassword,
    };
    const query = `($userName: String!,$userPassword: String!){
        signInUser:
        signinUser(
            email:{
                email:$userName,
                password:$userPassword,
            }
        ) {
            token,
            user { id, name } 
        },
    }`;
    
    client.mutate(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
    
}

loginUser("someone1@yahoo.com","some");
