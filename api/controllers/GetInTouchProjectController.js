// module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getProjects: function (req, res) {
    GetInTouchProject.getProjects(res.callback);
  },

  setProjectEnquiry: function (req, res) {
    if (req.body) {
      GetInTouchProject.setProjectEnquiry(req.body, res.callback);
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

