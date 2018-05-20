import Statistic from '../../../models/statistic';
import County from '../../../models/county';

// Display a Statistics by County.
exports.index = async function(req, res) {
  const { params: { id } } = req;
  const county = await County.findById(id).populate({path: 'stateId', select: 'name'});
  if (!county){
    return res.status(500).send({
      msg: 'county not found',
      success: false
    });
  }
  const statistics = await Statistic.find({ countyId: id }).sort({ statisticDate: 1});
  return res.status(200).send({
      msg: 'Ok',
      success: true,
      result : {county, statistics}
  });
};

// Display Statistic by id.
exports.show = function(req, res) {
  const { params: { id } } = req;
  Statistic.findById(id)
  .exec((err, statistic) => {
    if (err){
      return res.status(500).send({
        msg: 'statistic not found',
        success: false
      });
    }
    return res.status(200).send({
        msg: 'Ok',
        success: true,
        statistic
    });
  });
};
