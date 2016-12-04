const data=require('../actions/testData.js');
const TestUsers = data.TestUsers;
const TestProducts = data.TestProducts;
const TestRetailers = data.TestRetailers;
const TestProducers = data.TestProducers;

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

function GetProductItem(pid) {
    var productItem = null;
    for (var i=0; i < TestProducts.length; i++) {
        if (TestProducts[i].id == pid) {
            return TestProducts[i];
        }
    }
    return null;
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

export function SearchUsersImpl(searchTerm,onSearchResult) {
    var users = [];
    for (var i=0; i < TestUsers.length; i++) {
         users.push(TestUsers[i]);
    }
    onSearchResult(users,null);
}

export function SearchRetailersImpl(searchTerm,onSearchResult) {
    // BatsFix. use the term later!
    var retailers = [];

    for (var i=0; i < TestRetailers.length; i++) {
        var retailer = TestRetailers[i];
        retailers.push(retailer);
    }
    onSearchResult(retailers,null);
}

export function SearchProductsImpl(searchTerm,onSearchResult) {
    // BatsFix. use the term later!
    var products = [];
    for (var i=0; i < TestProducts.length; i++) {
        var product = TestProducts[i];
        products.push(product);
    }
    onSearchResult(products,null);
}

export function GetProductReviewImpl(reviewId,onProductReview) {
    // returns a review item...
    var productReview =
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
    };
    onProductReview(productReview,null);
}

export function GetRateQueueImpl(onRateQueue) {
    // returns the queue for the current user.
    // for test purposes push all test products
    var productItems = [];
    for (var i=0; i < TestProducts.length; i++) {
        productItems.push(TestProducts[i]);
    }
    onRateQueue(productItems,null);
}

export function GetLatestNewsImpl(onLatestNews) {
    var latestNews = [TestProducts[0],TestProducts[1]];
    onLatestNews(latestNews,null);
}

export function GetProductImpl(id,onProduct) {
    var product = null;
    product = TestProducts[id];
    product.related = GetRelatedProducts(product.id);
    product.producer = GetProducerItem(0);
    product.retailers = GetRetailerItems(product.rid);
    onProduct(product,null);
}

export function GetRetailerImpl(id,onRetailer) {

    var retailer = TestRetailers[0];

    retailer.products  = GetProductItems(retailer.pid);
    retailer.follower  = GetUserItems(retailer.follower);
    retailer.following = GetUserItems(retailer.following);
    return onRetailer(retailer,null);
}

export function GetProducerImpl(id,onProducer) {
    var producer = TestProducers[id];
    producer.products = GetProductItems(producer.pid);
    producer.retailers = GetRetailerItems(producer.rid);
    producer.following = GetUserItems(producer.following);
    producer.follower  = GetUserItems(producer.follower);

    onProducer(producer,null);
}

export function GetProfileImpl(id,onUserProfile) {
    var profile = {...TestUsers[0]};

    profile.products  = GetProductItems(profile.fpid);
    profile.producers = GetProducerItems(profile.pid);
    profile.retailers = GetRetailerItems(profile.rid);
    profile.following = GetUserItems(profile.following);
    profile.follower  = GetUserItems(profile.follower);
    profile.reviewProducts = GetProductItems(profile.rpid);
    onUserProfile(profile,null);
}

export function LoginUserImpl(name,password,onUserProfile) {
    // BatsFix. For test purposes all logged on users are 0
    GetProfileImpl('0',onUserProfile);
}

export function GetActivityProductsImpl(activityType,onActivityProducts) {
    // BatsFix. use the term later!
    console.log("Getting products impl");
    var products = [];
    for (var i=0; i < TestProducts.length; i+=2) {
        products.push(TestProducts[i]);
    }
    onActivityProducts(products,null);
}
