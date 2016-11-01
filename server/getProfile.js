const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my')
});
/*
{   id:'0',
    name:'Hash Tag',
    address:'Seattle, WA',
    score:'100000',
    follower:['1','2','3','4'],
    following:['2','3'],
    fpid:['4','5'],
    pid:['0','1'],
    rid:['1','2'],
    rpid:['1','2','3'],
},
    User(id:$userId)
    {
        id,
        name,
        image,
        score,
        products {id,name,rating,image,ratingCount,activity,thc,cbd},
        retailer {id, name},
        follower {id,name,score,image},
        following {id, name,score,image},
    }
*/
function GetProfile(userId) {
    const parameters = {
        userId: userId
    };
    const query = `query($userId: ID!){
    User(id:$userId)
    {
        id,
        name,
        image,
        score,
        follower  {id, name, score, image},
        following {id, name, score, image},
        retailers {id, name, image, rating, ratingCount, address},
        producers {id, name, image, rating, ratingCount},
        products  {id, name, image, rating, ratingCount, image},
    }
    }`;
       
    client.query(query, parameters).then(result => {
        console.log(result.User);
    }).catch(error=>{
        console.log("hit problem");
        console.log(error);
    });
}

client.query(`{
    allUsers{ id, name }
}`).then((result)=> {
    var allUsers = result.allUsers;
    for (var i=0; i < allUsers.length; i++) {
        GetProfile(allUsers[i].id);
        break;
    }
});

