// module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getProjects: function (req, res) {
    GetInTouchProject.getProjects(res.callback);
  },

  setGetInTouchProjectEnquiry: function (req, res) {
    if (req.body) {
      GetInTouchProject.setGetInTouchProjectEnquiry(req.body, res.callback);
    } else {
      res.json({
        message: {
          data: "Invalid request!"
        }
      })
    }
  },


  save: function (req, res) {
    if (req.body) {
      GetInTouchProject.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {

    if (req.body) {
      GetInTouchProject.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      GetInTouchProject.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      GetInTouchProject.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  findLimited: function (req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        GetInTouchProject.findLimited(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Please provide parameters"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
};
module.exports = _.assign(module.exports, controller);

