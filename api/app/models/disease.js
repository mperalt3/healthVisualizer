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

const Disease = mongoose.model('Disease', diseaseSchema);
export default Disease;
