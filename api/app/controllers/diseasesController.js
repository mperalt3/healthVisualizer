import Disease from '../models/disease';

// Display list of all Diseases.
exports.index = function(req, res) {
  Disease.find().sort({ name: 1 })
  .exec((err, diseases) => {
    if (err){
      res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    res.status(200).send({
        msg: 'Ok',
        success: true,
        diseases
    });
  });
};

// Display a Disease.
exports.show = function(req, res) {
  const { params: { id } } = req;
  Disease.findById(id)
  .exec((err, disease) => {
    if (err){
      return res.status(500).send({
        msg: 'disease not found',
        success: false
      });
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        disease
    });
  });
};
