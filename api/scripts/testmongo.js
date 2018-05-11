// var MongoClient = require('mongodb').MongoClient
//    , format = require('util').format;
// MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
//    if (err) {
//        throw err;
//    } else {
//        console.log("successfully connected to the database");
//    }
//    db.close();
// });

var MongoClient = require('mongodb').MongoClient
   , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, client) {
   if(err) throw err;
   var db = client.db('test')
   var collection = db.collection('test_insert');
   collection.insert({a:2}, function(err, docs) {
       collection.count(function(err, count) {
           console.log(format("count = %s", count));
           client.close();
       });
   });
});
