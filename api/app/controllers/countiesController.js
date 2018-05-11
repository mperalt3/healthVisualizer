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
  //Find one and populate with disease and stats
    res.send('NOT IMPLEMENTED: County show');
};

// Update a County.
exports.update = function(req, res) {
  //Mark as favorite
    res.send('NOT IMPLEMENTED: County update');
};
