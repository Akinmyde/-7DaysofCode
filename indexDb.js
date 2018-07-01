// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("DB", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("ConversionStore", {keyPath: "id"});
    var index = store.createIndex("ConversionStore", ["currencyPair", "Value"]);
};

// open.onsuccess = function() {
//     // Start a new transaction
//     var db = open.result;
//     var tx = db.transaction("ConversionStore", "readwrite");
//     var store = tx.objectStore("ConversionStore");
//     var index = store.index("ConversionStore");

//     // Add some data
//     store.put({id: 1, name: {first: "USD_NGN", last: "357.60"}, age: 42});
//     store.put({id: 2, name: {first: "Tosho", last: "Ajibade"}, age: 35});
//     store.put({id: 3, name: {first: "Dapo", last: "Rashid"}, age: 35});
    
//     // Query the data
//     var getOlu = store.get(1);
//     var getTosho = store.get(2);
//     var getDapo = store.get(3);

//     getOlu.onsuccess = function() {
//         console.log(getOlu.result.name.first);  // => "Olu"
//     };

//     getTosho.onsuccess = function() {
//         console.log(getTosho.result.name.first);   // => "Tosho"
//     };

//     getDapo.onsuccess = function() {
//       console.log(getDapo.result.name.first);   // => "Dapo"
//   };

//     // Close the db when the transaction is done
//     tx.oncomplete = function() {
//         db.close();
//     };
// }
