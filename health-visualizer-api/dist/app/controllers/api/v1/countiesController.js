'use strict';

var _county = require('../../../models/county');

var _county2 = _interopRequireDefault(_county);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Display list of all Counties, sorted by name.
exports.index = function (req, res) {
  var _req$query = req.query,
      isFavorite = _req$query.isFavorite,
      searchName = _req$query.searchName,
      offset = _req$query.offset,
      limit = _req$query.limit;

  var query = '';
  if (isFavorite && isFavorite === "true") {
    query = _county2.default.find({ isFavorite: true }).sort({ name: 1 }).populate({ path: 'stateId', select: 'name' });
  } else if (isFavorite && isFavorite === "false") {
    query = _county2.default.find({ isFavorite: false }).sort({ name: 1 }).populate({ path: 'stateId', select: 'name' });
  } else {
    query = _county2.default.find().sort({ name: 1 }).populate({ path: 'stateId', select: 'name' });
  }
  if (searchName) {
    query.find({ name: { "$regex": searchName.toLowerCase(), "$options": "i" } });
  }
  query.exec(function (err, counties) {
    if (err) {
      return res.status(500).send({
        msg: 'DB conection failed',
        success: false
      });
    }
    var result = counties;
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
exports.show = function (req, res) {
  var id = req.params.id;

  _county2.default.findById(id).exec(function (err, county) {
    if (err) {
      return res.status(500).send({
        msg: 'county not found',
        success: false
      });
    }
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      county: county
    });
  });
};

// Update a County. Mark as favorite
exports.update = function (req, res) {
  var id = req.params.id;
  var isFavorite = req.body.isFavorite;

  var favorite = '';
  if (isFavorite && isFavorite === "true") {
    favorite = true;
  } else if (isFavorite && isFavorite === "false") {
    favorite = false;
  } else {
    return res.status(400).send({
      msg: 'Bad request. isFavorite is not valid',
      success: false
    });
  }
  _county2.default.findOneAndUpdate({ _id: id }, { $set: { isFavorite: favorite } }, { new: true }, function (err, county) {
    if (err) {
      return res.status(500).send({
        msg: 'county not found',
        success: false
      });
    }
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      county: county
    });
  });
};