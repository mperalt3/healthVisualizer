import County from '../models/county';

// Display list of all Counties, sorted by name.
exports.index = function(req, res) {
  County.find().sort({ name: -1 })
  .exec((err, counties) => {
    if (err){
      res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    res.status(200).send({
        msg: 'Ok',
        success: true,
        counties
    });
  });
};

// Display a County.
exports.show = function(req, res) {
  const { params: { id } } = req;
  County.findById(id)
  .exec((err, county) => {
    if (err){
      return res.status(500).send({
        msg: 'county not found',
        success: false
      });
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        county
    });
  });
};

// Update a County. Mark as favorite
exports.update = function(req, res) {
  const { params: { id } } = req;
  const { body: { isFavorite } } = req;
  let favorite = '';
  if (isFavorite && isFavorite === "true"){ favorite = true }
  else if (isFavorite && isFavorite === "false"){ favorite = false }
  else {
    return res.status(400).send({
      msg: 'Bad request. isFavorite is not valid',
      success: false
    });
  }
  County.findOneAndUpdate({_id: id}, {$set:{isFavorite: favorite}}, {new: true}, function(err, county){
    if(err){
      return res.status(500).send({
        msg: 'county not found',
        success: false
      });
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        county
    });
  });
};
