module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  saveKnow: function (req, res) {
    if (req.body) {
      Know.saveKnow(req.body, res.callback);
    } else {
      res.json({
        message: {
          data: "Invalid request!"
        }
      })
    }
  }
};
module.exports = _.assign(module.exports, controller);

