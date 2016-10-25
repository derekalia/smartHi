const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});

function deleteUser(userId) {
    const parameters = {
        userId: userId
    };
    const query = `($userId: ID!){
        deletedUser: 
        deleteUser(id:$userId)
        {
            id,
            name,
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
    allUsers {
        id,
        name,
    }
}`).then( result => {
    var allUsers = result.allUsers;
    for (var i=0; i < allUsers.length; i++) {
         deleteUser(allUsers[i].id);
    }
}).catch((error) => {
    console.log(error);
});

