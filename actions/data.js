const TestUsers = [
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
{   id:'1',
    name:'Cookie Monster',
    address:'Seattle, WA',
    score:'100000',
    follower:['2','3','4'],
    following:['2','3'],
    fpid:['4','0'],
    pid:['2','1'],
    rid:['3','4'],
    rpid:['3','4','5'],
},
{   id:'2',
    name:'VW Bug',
    address:'Redmond, WA',
    score:'100000',
    follower:['1','3','4'],
    following:['1','3'],
    fpid:['0','1'],
    pid:['1','4'],
    rid:['0','1','2'],
    rpid:['2','4','5'],
},
{   id:'3',
    name:'330 BMW',
    address:'Redmond, WA',
    score:'100000',
    follower:['2','3'],
    following:['2','3'],
    fpid:['3','4','5','6'],
    pid:['2','4'],
    rid:[],
    rpid:['0','1','5'],
},
{   id:'4',
    name:'X5 BMW',
    address:'Issaquah, WA',
    score:'100000',
    follower:['3','4'],
    following:['3','4'],
    fpid:['0','1','5','6'],
    pid:['2','3'],
    rid:[],
    rpid:['0','2','4'],
},
];


const TestProducers = [
{   id:'0',
    name:'Forged Reason',
    description:'Forged for sure',
    rating: 4,
    ratingCount: 100,
    pid:['0','1','2','3'],},

{   id:'1',
    name:'Starbucks',
    description:'Wide wide world',
    rating: 4,
    ratingCount: 200,
    pid:['4','5'],},

{   id:'2',
    name:'Petes',
    description:'All around best producer',
    rating: 2,
    ratingCount: 300,
    pid:['6','7','8','9','10'],},

{   id:'3',
    rating: 4,
    ratingCount: 400,
    description:'South Beach one of a kind',
    name:'South Beach',
    pid:['11','12','13'],},
];

const TestRetailers = [
{   id:'0',
    name:'Forged Bellevue',
    address:'Bellevue 98004',
    rating: 4,
    ratingCount: 703,
    description:'Forged Bellevue is excellent',
    pid:['0','1','2','3','4','5','6','7'],},
{   id:'1',
    name:'Tully Issaquah',
    address:'Issaquah 98004',
    rating: 5,
    ratingCount: 103,
    description:'Tully Issaquah has excellent taste.',
    pid:['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],},
{   id:'2',
    name:'Starbucks Gillman',
    address:'Issaquah Gillman Boulevard',
    rating: 2,
    ratingCount: 203,
    description:'Starbucks Gillman is the best',
    pid:['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],},
{   id:'3',
    name:'Petes Seattle',
    address:'First Ave, Seattle',
    rating: 5,
    ratingCount: 403,
    description:'Petes Seattle is excellent',
    pid:['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],},
{   id:'4',
    name:'Magnolia Rio',
    address:'Discovery Park Road, Seattle',
    rating: 4,
    ratingCount: 545,
    description:'Magnolia Rio is excellent',
    pid:['8','9','10','11','12','13'],},
];


const TestProducts = [
{   id:'0',
    name:'FORGED - XJ-13',
    description:'FORGED Rosin Is our process of extracting oils from cannabis. We use very low temperatures to reduce the terpene evaporation which is critical to the experience of our product.',
    price: 39.99,
    rating: 3.5,
    ratingCount: 323,
    quality: 3,
    flavor: 4,
    potency:5,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',
    symptom:['cramps','headaches','pain'],
    activity:['social','exercise','work'],
    effect:[{name:'energetic',strength:190},{name:'giggly',strength:50},{name:'relaxed',strength:60}]},


{   id:'1',
    name:'Forged SML',
    description:'Forged SML excellent',
    price: 25.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 4,
    flavor: 4,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',
    symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'wake',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'2',
    name:'Tully SML',
    description:'Tested quality is excellent all around',
    price: 35.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 5,
    flavor: 4,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',
    symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'wake',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'3',
    name:'Tully Smart',
    description:'Tested quality is excellent all around',
    price: 45.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 4,
    flavor: 4,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'wake',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'4',
    name:'Starbucks tall',
    description:'Tested quality is excellent all around',
    price: 15.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 3,
    flavor: 5,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'1',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'grant',strength:90},{name:'wow',strength:80},{name:'jump',strength:60}]},

{   id:'5',
    name:'Starbucks grande',
    description:'Tested quality is excellent all around',
    price: 45.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 3,
    flavor: 2,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'1',
    symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'grant',strength:90},{name:'wow',strength:80},{name:'jump',strength:60}]},

{   id:'6',
    name:'Petes espresso',
    description:'Tested quality is excellent all around',
    price: 25.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 3,
    flavor: 2,
    potency:4,
    thc: 30,
    cbd: 35,symptom:['cramps','headaches','pain'],
    thca: 55,
    rid:['0','1','2','3'],
    pid:'2',
    activity:['mm','mars','pick'],
    effect:[{name:'grant',strength:90},{name:'wow',strength:80},{name:'jump',strength:60}]},

{   id:'7',
    name:'Petes SML',
    description:'Tested quality is excellent all around',
    price: 27.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 3,
    flavor: 5,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'2',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'aroma',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'8',
    name:'Petes MID',
    description:'Tested quality is excellent all around',
    price: 28.00,
    rating: 3.5,
    ratingCount: 333,
    quality: 3,
    flavor: 4,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['4','1','2','3'],
    pid:'2',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'aroma',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'9',
    name:'Petes LRG',
    description:'Tested quality is excellent all around',
    price: 29.00,
    rating: 3.5,
    ratingCount: 433,
    quality: 5,
    flavor: 4,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['4','1','2','3'],
    pid:'2',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'aroma',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'10',
    name:'Petes XL',
    description:'Tested quality is excellent all around',
    price: 35.00,
    rating: 3.5,
    ratingCount: 313,
    quality: 3,
    flavor: 5,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['4','1','2','3'],
    pid:'2',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],effect:[{name:'aroma',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'11',
    name:'South Beach',
    description:'Tested quality is excellent all around',
    price: 55.00,
    rating: 3.5,
    ratingCount: 533,
    quality: 3,
    flavor: 5,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['4','1','2','3'],
    pid:'3',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'sleep',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'12',
    name:'North Beach',
    description:'Tested quality is excellent all around',
    price: 25.00,
    rating: 3.5,
    ratingCount: 533,
    quality: 3,
    flavor: 3,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['4','1','2','3'],
    pid:'3',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'sleep',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},

{   id:'13',
    name:'Pond Beach',
    description:'Tested quality is excellent all around',
    price: 25.00,
    rating: 3.5,
    ratingCount: 733,
    quality: 3,
    flavor: 4,
    potency:3,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['4','1','2','3'],
    pid:'3',symptom:['cramps','headaches','pain'],
    activity:['mm','mars','pick'],
    effect:[{name:'sleep',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},
];

function GetRelatedProducts(id){
    var products = [];
    var count = 0;
    for (var j=0; j < TestProducts.length && count < 8; j++) {
       if (TestProducts[j].id != id) {
           products.push(TestProducts[j]);
           count++;
       }
    }
    return products;
}


function GetRetailerItems(rid){
    var retailers = [];
    for (var i=0; i < rid.length; i++) {
         for (var j=0; j < TestRetailers.length; j++) {
            if (TestRetailers[j].id == rid[i]) {
                retailers.push(TestRetailers[j]);
                break;
            }
         }
    }
    return retailers;
}

function GetProducerItem(pid){
     for (var j=0; j < TestProducers.length; j++) {
        if (TestProducers[j].id == pid) {
            return TestProducers[j];
        }
     }
    return null;
}

function GetProducerItems(pid) {
    var producerItems = [];
    for (var i=0; i < pid.length; i++) {
        for (var j=0; j < TestProducers.length; j++) {
            if (TestProducers[j].id == pid[i]) {
                producerItems.push(TestProducers[j]);
                break;
            }
        }
    }
    return producerItems;
}


function GetProductItems(pid) {
    var productItems = [];
    for (var i=0; i < pid.length; i++) {
        for (var j=0; j < TestProducts.length; j++) {
            if (TestProducts[j].id == pid[i]) {
                productItems.push(TestProducts[j]);
                break;
            }
        }
    }
    return productItems;
}

function GetUserItems(pid) {
    var userItems = [];
    for (var i=0; i < pid.length; i++) {
        for (var j=0; j < TestUsers.length; j++) {
            if (TestUsers[j].id == pid[i]) {
                userItems.push(TestUsers[j]);
                break;
            }
        }
    }
    return userItems;
}

export function SearchUsers(searchTerm) {
    var users = [];
    for (var i=0; i < TestUsers.length; i++) {
         users.push(TestUsers[i]);
    }
    return users;
}


export function SearchProducers(searchTerm) {
    // BatsFix. use the term later!
    var producers = [];
    for (var i=0; i < TestProducers.length; i++) {
        products.push(TestProducers[i]);
    }
    return producers;
}

export function SearchRetailers(searchTerm) {
    // BatsFix. use the term later!
    var retailers = [];
    for (var i=0; i < TestRetailers.length; i++) {
        retailers.push(TestRetailers[i]);
    }
    return retailers;
}

export function SearchProducts(searchTerm) {
    // BatsFix. use the term later!
    var products = [];
    for (var i=0; i < TestProducts.length; i++) {
        products.push(TestProducts[i]);
    }
    return products;
}

export function GetLatestNews() {
    return {staffPick:TestProducts[0],trending:TestProducts[1]};
}

export function GetProduct(id) {
    var product = null;
    for (var i=0; i < TestProducts.length; i++) {
        if (TestProducts[i].id == id) {
            product = TestProducts[i];
            product.retailers = GetRetailerItems(product.rid);
            product.producer  = GetProducerItem(product.pid);
            product.related   = GetRelatedProducts(product.pid);
            return product;
        }
    }
    return null;
}

export function GetRetailer(id) {
    var retailer = null;
    for (var i=0; i < TestRetailers.length; i++) {
        if (TestRetailers[i].id == id) {
           retailer = TestRetailers[i];
           retailer.products = GetProductItems(retailer.pid);
           return retailer;
        }
    }
    return null;
}

export function GetProducer(id) {
    var producer = null;
    for (var i=0; i < TestProducers.length; i++) {
        if (TestProducers[i].id == id) {
            producer = TestProducers[i];
            producer.products = GetProductItems(producer.pid);
            return producer;
        }
    }
    return null;
}

export function GetUserProfile(id) {
    var profile = {};
    for (var i=0; i < TestUsers.length; i++) {
        if (TestUsers[i].id == id) {
            var user  = TestUsers[i];

            profile.id = user.id;
            profile.name = user.name;
            profile.address = user.address;
            profile.score = user.score;
            profile.products  = GetProductItems(user.fpid);
            profile.producers = GetProducerItems(user.pid);
            profile.retailers = GetRetailerItems(user.rid);
            profile.following = GetUserItems(user.following);
            profile.follower  = GetUserItems(user.follower);
            profile.reviewProducts = GetProductItems(user.rpid);
            return profile;
        }
    }
    return null;
}

export function GetActivityProducts(activityType) {
    // BatsFix. use the term later!
    var products = [];
    for (var i=0; i < TestProducts.length; i+=2) {
        products.push(TestProducts[i]);
    }
    return products;
}
//
// BatsFix. Following are for review tab
//
export function UploadProductImage() {
    return ({productInfo:TestProducts[0],storeInfo:TestRetailers[1]});
}
export function UploadProductRating() {

}
export function UploadStoreRating() {

}
