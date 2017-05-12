// module.exports = _.cloneDeep(require("sails-wohlig-controller"));
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
  },

  getSubscribedUsers: function (req, res) {
    Subscribe.getSubscribedUsers(res.callback);
  },

  isUserSubscribed: function (req, res) {
    if (req.body) {
      Subscribe.isUserSubscribed(req.body, res.callback);
    } else {
      res.json({
        message: {
          data: "Invalid request"
        }
      })
    }
  },

  save: function (req, res) {
    if (req.body) {
      Subscribe.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {

    if (req.body) {
      Subscribe.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      Subscribe.deleteData(req.body, res.callback);
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
      Subscribe.getAll(req.body, res.callback);
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
        Subscribe.findLimited(req.body, res.callback);
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
  }
};
module.exports = _.assign(module.exports, controller);

