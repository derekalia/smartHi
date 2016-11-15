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

exports.TestUsers=TestUsers;  
exports.TestProducts=TestProducts;  
exports.TestProducers=TestProducers;  
exports.TestRetailers=TestRetailers;  
