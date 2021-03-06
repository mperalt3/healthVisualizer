import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let countySchema = new Schema({
  stateId: {
    type: Schema.ObjectId,
    ref: 'State',
    required: true,
  },

  name: {
    type: String,
    trim: true,
    lowercase: true
  },

  fipsCode: {
    type: String,
    trim: true,
    lowercase: true
  },

  isFavorite: {
    type: Boolean,
    enum: [true, false],
    default: false
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
countySchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
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

const County = mongoose.model('County', countySchema);
export default County;
