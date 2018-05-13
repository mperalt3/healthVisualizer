import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let statisticSchema = new Schema({
  countyId: {
    type: Schema.Types.ObjectId,
    ref: 'County',
    required: true,
  },

  diseaseId: {
    type: Schema.Types.ObjectId,
    ref: 'Disease',
    required: true,
  },

  statisticDate: {
    type: Date
  },

  totalCount: {
    type: Number
  },

  percent: {
    type: Number
  },

  lowerConfidenceLimit: {
    type: Number
  },

  upperConfidenceLimit: {
    type: Number
  },

  ageAdjustedPercent: {
    type: Number
  },

  ageLowerConfidenceLimit: {
    type: Number
  },

  ageUpperConfidenceLimit: {
    type: Number
  },

  // F: Female, M: Male, A: All
  genderScope: {
    type: String,
    enum: ["F", "M", "A"],
    trim: true,
    default: "A"
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


const Statistic = mongoose.model('Statistic', statisticSchema);
export default Statistic;
