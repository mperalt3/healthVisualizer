import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let countySchema = new Schema({
  stateId: {
    type: Schema.Types.ObjectId,
    ref: 'State',
    required: true,
  },

  name: {
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

countySchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

const County = mongoose.model('County', countySchema);
export default County;
