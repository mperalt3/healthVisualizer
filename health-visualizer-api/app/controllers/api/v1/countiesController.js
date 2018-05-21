import County from '../../../models/county';

// Display list of all Counties, sorted by name.
exports.index = function(req, res) {
  const { query: { isFavorite, searchName, offset, limit} } = req;
  let query = '';
  if (isFavorite && isFavorite === "true"){
    query = County.find({ isFavorite: true }).sort({ name: 1 }).populate({path: 'stateId', select: 'name'})
  }else if (isFavorite && isFavorite === "false"){
    query = County.find({ isFavorite: false }).sort({ name: 1 }).populate({path: 'stateId', select: 'name'})
  }else{
    query = County.find().sort({ name: 1 }).populate({path: 'stateId', select: 'name'})
  }
  if (searchName){
    query.find({ name:  { "$regex": searchName.toLowerCase(), "$options": "i" }  })
  }
  query.exec((err, counties) => {
    if (err){
      return res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    let result = counties;
    if (offset && limit) {
      result = counties.slice(parseInt(offset), parseInt(limit) + parseInt(offset));
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        totalCounties: counties.length,
        counties: result
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
