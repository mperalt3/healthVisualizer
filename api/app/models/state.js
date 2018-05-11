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

const State = mongoose.model('State', stateSchema);
export default State;
