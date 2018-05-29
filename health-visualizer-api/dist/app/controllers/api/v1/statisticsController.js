'use strict';

var _statistic = require('../../../models/statistic');

var _statistic2 = _interopRequireDefault(_statistic);

var _county = require('../../../models/county');

var _county2 = _interopRequireDefault(_county);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Display a Statistics by County.
exports.index = async function (req, res) {
  var id = req.params.id;

  var county = await _county2.default.findById(id).populate({ path: 'stateId', select: 'name' });
  if (!county) {
    return res.status(500).send({
      msg: 'county not found',
      success: false
    });
  }
  var statistics = await _statistic2.default.find({ countyId: id }).populate({ path: 'diseaseId', select: 'name' }).sort({ statisticDate: 1 });
  return res.status(200).send({
    msg: 'Ok',
    success: true,
    result: { county: county, statistics: statistics }
  });
};

// Display Statistic by id.
exports.show = function (req, res) {
  var id = req.params.id;

  _statistic2.default.findById(id).exec(function (err, statistic) {
    if (err) {
      return res.status(500).send({
        msg: 'statistic not found',
        success: false
      });
    }
    return res.status(200).send({
      msg: 'Ok',
      success: true,
      statistic: statistic
    });
  });
};