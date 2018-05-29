import mongoose from 'mongoose';
import State from '../../../models/state';

// Display list of all States sorted by name.
exports.index = async (req, res) => {
  State.find().sort({ name: 1 })
  .exec((err, states) => {
    if (err){
      return res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        states
    });
  });
};

// Display a State.
exports.show = async (req, res) => {
  const { params: { id } } = req;
  State.findById(id)
  .exec((err, state) => {
    if (err){
      return res.status(500).send({
        msg: 'state not found',
        success: false
      });
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        state
    });
  });
};
