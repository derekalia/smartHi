const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function createUser(userName) {
    var email=userName+"@yahoo.com";
    const parameters = {
        userName: userName,
        email: email,
    };
    const query = `($userName: String!,$email: String!){
        newUser:
        createUser(
            name:$userName,
            score:0,
            address:"Seattle,WA",
            image:"test.png",
            rateQueue:[],
            authProvider:{
                email:{
                    email:$email,
                    password:"some"
                }
            }
        ) {
            id,
            name,
            createdAt,
        },
    }`;

    client.mutate(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}
for (var i=0; i < 5; i++) {
    createUser("someone" + i);
}
