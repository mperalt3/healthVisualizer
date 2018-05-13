import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let stateSchema = new Schema({
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

stateSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
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


const State = mongoose.model('State', stateSchema);
export default State;
