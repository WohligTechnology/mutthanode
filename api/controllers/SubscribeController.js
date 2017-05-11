module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  subscribeUser: function (req, res) {
    if (req.body) {
      Subscribe.subscribeUser(req.body, res.callback);
    } else {
      res.json({
        message: {
          data: "Invalid request"
        }
      })
    }
  }
};
module.exports = _.assign(module.exports, controller);

