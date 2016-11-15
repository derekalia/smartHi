import {TestUsers} from './testData.js';

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

export async function SearchRetailers(searchTerm) {
    // BatsFix. use the term later!
    var retailers = [];
    var queryRetailer = '{RetailStores{UID,Title}}';
    var data = await FetchData(queryRetailer);
    
    for (var i=0; i < data.RetailStores.length; i++) {
        var retailer = CreateRetailerItem(data.RetailStores[i]);
        retailers.push(retailer);
    }
    return retailers;
}

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

function CreateRetailerItem(data,price) {
    // BatsFix. Missing items are
    // 1. retail store image
    // 2. retail store rating
    // 3. retail store ratingCount;
    // 4. retail store address
    var retailer = {...TestRetailers[0]};
    retailer.id = data.UID;
    retailer.name = data.Title;
    retailer.price = price;
    return retailer;
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
             var retailer = CreateRetailerItem(priceEntries[i].RetailStore, priceEntries[i].Price); 
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

export async function GetUserToken(userName,password) {
    return new Promise(function(resolve,reject) {
        //setTimeout(function() {resolve({name:"cheech",userId:0,token:"testUserToken"});},2000);
        throw "bad call example";
    });
}


