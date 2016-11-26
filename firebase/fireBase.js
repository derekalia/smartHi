var firebase=require('../actions/firebase.js');

/*
BatsFix. Convert thse to true unit tests.
firebase.LoginUserImpl("test@yahoo.com","test12",(profile,error)=>{
    console.log("got logged on");
    console.log("user id is " + profile.id); 
    // After logging on we can run other tests. 
    firebase.CreateProfileImpl("sometestidhere","testname",(profile,error)=> {
          console.log("got profile");
          console.log(profile);
    });
});


firebase.CreateUserImpl("test8@yahoo.com","mytestname","test12",(profile,error)=>{
    console.log("created user");
    console.log(profile);
    firebase.GetProductImpl('0',(product,error)=> {
        console.log("got here");
        console.log(product);
        console.log(error);
    });
});

firebase.LoginUserImpl("test@yahoo.com","test12",(profile,error)=>{
    console.log("got logged on");
    console.log("user id is " + profile.id); 
    // After logging on we can run other tests. 
    firebase.ChangeUserNameImpl(profile.id,"fireball",(error)=> {
            console.log("change user name result:");
            console.log(error);
    });
});

*/
