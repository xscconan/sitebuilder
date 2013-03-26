var db = require("../../../storge/db/db.js");
var mongoose = require('mongoose');

db.init();

var PersonSchema = new mongoose.Schema({
       name:String
});

var PersonModel = global.db.model('Person', PersonSchema);
var personEntity = new PersonModel({name:'Krouky'});


db.write(personEntity);