import mongoose from 'mongoose';
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

diseaseSchema.statics.findOneOrCreate = async function findOneOrCreate(condition, callback) {
    const self = this
    await self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

const Disease = mongoose.model('Disease', diseaseSchema);
export default Disease;
