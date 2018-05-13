import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';
const Schema = mongoose.Schema;

let diseaseSchema = new Schema({
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
    const self = this;
    let result = await self.findOne(condition);
    if (result){
      console.log("encontrado:" + result);
      return result;
    }
    else{
      result = await self.create(condition);
      console.log("creado:" + result);
      return result;
    }
}

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
const Disease = mongoose.model('Disease', diseaseSchema);
export default Disease;
