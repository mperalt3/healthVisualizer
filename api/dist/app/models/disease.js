'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFindOrCreate = require('mongoose-find-or-create');

var _mongooseFindOrCreate2 = _interopRequireDefault(_mongooseFindOrCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var diseaseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// diseaseSchema.plugin(findOrCreate);
// diseaseSchema.statics.findOneOrCreate = async function findOneOrCreate(condition, callback) {
//     const self = this
//     return await self.findOne(condition, (err, result) => {
//         return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
//     })
// }

diseaseSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  var self = this;
  var result = await self.findOne(condition);
  if (result) {
    console.log("encontrado:" + result);
    return result;
  } else {
    result = await self.create(condition);
    console.log("creado:" + result);
    return result;
  }
};

// diseaseSchema.statics.findOneOrCreate = async function findOneOrCreate(condition, callback) {
//     const self = this;
//     const result = await self.findOne(condition, (err) => console.log("error finOne:"+err))
//     if (result){
//       return callback(null, result)
//     }else{
//       const result = await self.create(condition, (err) => console.log("error create"+err))
//       return callback(null, result)
//     }
// }

// diseaseSchema.statics.findOneOrCreate3 = async function findOneOrCreate3(condition, callback) {
//     const self = this
//     await self.findOne(condition, (err, result) => {
//         return result ? result : self.create(condition, (err, result) => { console.log(err) })
//     })
// }
var Disease = _mongoose2.default.model('Disease', diseaseSchema);
exports.default = Disease;