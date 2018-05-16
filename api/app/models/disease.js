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

// This asynchronous function look for a collection by the condition. If it is found is returned, othewise a new collection with the data in condition is created and returned.
diseaseSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
    const self = this;
    let result = await self.findOne(condition);
    if (result){
      return result;
    }
    else{
      result = await self.create(condition);
      return result;
    }
}

const Disease = mongoose.model('Disease', diseaseSchema);
export default Disease;
