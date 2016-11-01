const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
  //transport: new Transport('http://graphql-swapi.parseapp.com/')
});

function addToFollow(followingId,followerId) {
    const parameters = {
        followingId: followingId,
        followerId: followerId,
    };
    const query = `($followingId: ID!,$followerId: ID!){
        addToFollow:
        addToFollow(
            followingUserId:$followingId,
            followerUserId:$followerId,
        ){ followerUser {name}, followingUser{name}}
    }`;

    client.mutate(query, parameters).then(result => {
        console.log(result);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


client.query(`{
    allUsers{ id, name }
}`).then((result)=> {
    var allUsers = result.allUsers;
    console.log("all users" + allUsers.length);

    for (var i=0; i < allUsers.length; i++) {
        var userId = allUsers[i].id;
        var following = [];
        for (var j=0; j < 5; j++) {
            var followingId = allUsers[getRandom(0,allUsers.length-1)].id;
            if (!following.includes(followingId) && followingId != userId) {
                console.log("following  " + followingId + " " + userId);
                addToFollow(followingId,userId);

            }
        }
    }
}).catch(error => {
    console.log(error);
});

