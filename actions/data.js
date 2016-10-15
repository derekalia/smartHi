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
    rid:['0','1','4','5'], //Producer 0 is a special case and used to test producer login
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['0','1','2','3'],},

{   id:'1',
    name:'Starbucks',
    description:'Wide wide world',
    rating: 4,
    ratingCount: 200,
    rid:['0','1','4','5'], //Producer 0 is a special case and used to test producer login
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['4','5'],},

{   id:'2',
    name:'Petes',
    description:'All around best producer',
    rating: 2,
    ratingCount: 300,
    rid:['0','1','4','5'], //Producer 0 is a special case and used to test producer login
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['6','7','8','9','10'],},

{   id:'3',
    rating: 4,
    ratingCount: 400,
    description:'South Beach one of a kind',
    name:'South Beach',
    rid:['0','1','4','5'], //Producer 0 is a special case and used to test producer login
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['11','12','13'],},
];

const TestRetailers = [
{   id:'0',
    name:'Forged Bellevue',
    address:'Bellevue 98004',
    rating: 4,
    ratingCount: 703,
    description:'Forged Bellevue is excellent',
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['0','1','2','3','4','5','6','7'],},
{   id:'1',
    name:'Tully Issaquah',
    address:'Issaquah 98004',
    rating: 5,
    ratingCount: 103,
    description:'Tully Issaquah has excellent taste.',
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],},
{   id:'2',
    name:'Starbucks Gillman',
    address:'Issaquah Gillman Boulevard',
    rating: 2,
    ratingCount: 203,
    description:'Starbucks Gillman is the best',
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],},
{   id:'3',
    name:'Petes Seattle',
    address:'First Ave, Seattle',
    rating: 5,
    ratingCount: 403,
    description:'Petes Seattle is excellent',
    follower:['0','1','2'],
    following:['0','3','4'],
    pid:['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],},
{   id:'4',
    name:'Magnolia Rio',
    address:'Discovery Park Road, Seattle',
    rating: 4,
    ratingCount: 545,
    description:'Magnolia Rio is excellent',
    follower:['0','1','2'],
    following:['0','3','4'],
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

export function GetProductItem(pid) {
    var productItem = null;
    for (var i=0; i < TestProducts.length; i++) {
        if (TestProducts[i].id == pid) {
            return TestProducts[i];
        }
    }
    return null;
}

export function GetProductReview(reviewId) {
    // returns a review item...
    return (
    {
        // This is the full review
        review: {
            rating: 4,
            quality: 3,
            potency: 5,
            flavor:4,
            symptom:['cramps','headaches','pain'],
            activity:['social','exercise','work'],
            effect:[{name:'energetic',strength:90},{name:'giggly',strength:50},{name:'relaxed',strength:60}],
            comment:'I felt like it had strong effect and enjoyed the overall experience',
        },
        product: TestProducts[0],
        user: TestUsers[0],
    });
}

export function GetRateQueue() {
    // returns the queue for the current user.
    // for test purposes push all test products
    var productItems = [];
    for (var i=0; i < TestProducts.length; i++) {
        productItems.push(TestProducts[i]);
    }
    return productItems;
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
async function FetchData(queryValue) {
    var queryString = JSON.stringify({query:queryValue})
    var response =  await fetch("https://lcbapi.forged.io/api/GQLCi", {
                    method: 'post',
                    headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    }, 
                    body: queryString,
                    credentials:'include',
                 });

     // Make sure to catch bad response.
     if (response.status != 200) {
         console.log("FetchData:" + response.status);
         throw "FetchData:" + response.status;
     }

     var response= JSON.parse(response._bodyText);

     return response.data;
}

export async function SearchUsers(searchTerm) {
    var users = [];
    for (var i=0; i < TestUsers.length; i++) {
         users.push(TestUsers[i]);
    }
    return users;
}

export async function SearchProducers(searchTerm) {
    // BatsFix. use the term later!
    var producers = [];
    for (var i=0; i < TestProducers.length; i++) {
        products.push(TestProducers[i]);
    }
    return producers;
}

export async function SearchRetailers(searchTerm) {
    // BatsFix. use the term later!
    var retailers = [];
    for (var i=0; i < TestRetailers.length; i++) {
        retailers.push(TestRetailers[i]);
    }
    return retailers;
}

/*
export async function SearchProducts(searchTerm) {
    // BatsFix. use the term later!
    var products = [];
    for (var i=0; i < TestProducts.length; i++) {
        products.push(TestProducts[i]);
    }
    return products;
}
*/

export async function SearchProducts(searchTerm) {
    // BatsFix. use the term later!
    var queryProduct = '{Products{UID,Title,ImageURLs,ProductType,DominantSpecies}}';
    var data =  await FetchData(queryProduct);
    var products = [];
    for (var i=0; i < data.Products.length; i++) {
        var product = CreateProductItem(data.Products[i]);
        products.push(product);
    }
    return products;
}

function CreateProducerItem(data) {
    var producer = {...TestProducers[0]};
    producer.id =  data.UID;
    producer.name = data.Title;
    producer.description = data.Description;
    producer.images = data.ImageURLs;
    return producer;
}

function CreateRetailerItems(priceEntries) {
    // BatsFix. Missing items are
    // 1. retail store image.
    // 2. retail store rating
    // 3. retail store ratingCount
    // 4. retail store address
    var retailerItems = [];
    if (priceEntries != null) {
        for (var i=0; i < priceEntries.length; i++) {
             var retailer = {...TestRetailers[0]};
             retailer.id   = priceEntries[i].RetailStore.UID;
             retailer.name = priceEntries[i].RetailStore.Title;
             retailer.price = priceEntries[i].Price;
             retailerItems.push(retailer);
        }
    }
    return retailerItems;
}

function CreateRetailer(data) {
    //BatsFix. Missing items are
    // 1. retail store image.
    // 2. retail store description
    // 3. retail store rating
    // 4. retail store ratingCount
    // 5. retail store address
    var retailer = {...TestRetailers[0]};
    retailer.id   = data.UID;
    retailer.name = data.Title;
    return retailer; 
}

function CreateProductItem(data) {
    // BatsFix. Missing items are
    // 1. rating
    // 2. ratingCount
    var product = {...TestProducts[0]};
    console.log("UID of product is " + data.UID);
    product.id =  data.UID;
    product.name = data.Title;
    product.images = data.ImageURLs;
    return product;
}

function CreateProduct(data) {
    // BatsFix. Missing items are
    // 1. rating
    // 2. ratingCount
    // 3. quality
    // 4. flavor
    // 5. potency
    // 6. thc, cbd, thca
    // 7. symptom, activity, effect
    var product = {...TestProducts[0]};
    console.log("UID of product is " + data.UID);
    product.id =  data.UID;
    product.name = data.Title;
    product.strain = data.Strain;
    product.productType = data.ProductType;
    product.dominantSpecies = data.DominantSpecies;
    product.description = data.Description;
    product.images = data.ImageURLs;
    return product;
}

function CreateRelatedProducts(data) {
    var products = [];
    for (var i=0; i < data.length; i++) {
         var product = CreateProduct(data[i]);
         products.push(product);
    }
    return products;
}

export  async function GetLatestNews() {
    var queryValue = "{Products{UID,Title}}";
    var data =  await FetchData(queryValue);

    var staffPick = CreateProduct(data.Products[0]);
    var trending  = CreateProduct(data.Products[1]);
    return {staffPick:staffPick,trending:trending};
}

export async function GetProduct(id) {
    var product = null;
    // BatsFix. Temporary workaround the problem where productlist is out of sync
    if (id == 0) {id = 1;}
    var queryProduct = 
    `{Products(id:${id}){UID,Title,ImageURLs,Strain,Description,PriceEntries{UID,Price,RetailStore{UID,Title}},Producer{UID,Title,Description,ImageURLs}}}`;
    // Fetch data from server
    var data = await FetchData(queryProduct);

    var productData = data.Products[0];
    var product       = CreateProduct(productData);
    product.retailers = CreateRetailerItems(productData.PriceEntries);
    product.producer  = CreateProducerItem(productData.Producer);

    //
    // BatsFix. Related products not present on server yet. so
    // use all products.
    //
    var queryRelatedProducts = 
    '{Products{UID,Title,ImageURLs,Strain,Description}}';
    data = await FetchData(queryRelatedProducts);
    product.related   = CreateRelatedProducts(data.Products);
    
    //product.related = GetRelatedProducts(product.id);
    return product;
}

export async function GetRetailer(id) {
    // BatsFix. It is missing
    // 1. PriceEntries are missing product information. It only returns UID and Price.
    // 2. PriceEntries query does not work
    // 3. Address attribute missing
    // 4. rating
    // 5. ratingCount
    // 6. description
    // 7. follower,
    // 8. following
    var queryRetailer = `{RetailStores(id:${id},count:1){UID,Title,PriceEntries{UID,Price}}}`;

    var data = await FetchData(queryRetailer);
   
    var retailer = CreateRetailer(data.RetailStores[0]);

    retailer.products  = GetProductItems(retailer.pid);
    retailer.follower  = GetUserItems(retailer.follower);
    retailer.following = GetUserItems(retailer.following);
    return retailer;
}

export async function GetProducer(id,fullInfo) {
    var producer = null;
    //Producers dont have title!!!!BatsFix
    var fakeId = 1;
    var queryProducer = `{Producers(id:${fakeId}){UID,Title,Description,ImageURLs}}`;
    var data = await FetchData(queryProducer);
    console.log("producer"+data.Producers[0].ImageURLs);
    console.log("producer id ["+id + "]");

    for (var i=0; i < TestProducers.length; i++) {
        if (TestProducers[i].id == id) {
            producer = TestProducers[i];
            producer.products = GetProductItems(producer.pid);
            if (fullInfo) {
                producer.retailers = GetRetailerItems(producer.rid);
                producer.following = GetUserItems(producer.following);
                producer.follower  = GetUserItems(producer.follower);
            }
            var item = {...producer};
            return item;
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
