var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    excel: {
      name: "Email"
    }
  },
  status: {
    type: String,
    status: "Enabled"
  }
});

module.exports = mongoose.model('Subscribe', schema);

var model = {
  subscribeUser: function (data, callback) {
    Subscribe.saveData(data, function (err, data) {
      if (err) {
        callback(err, null);
      } else if (data) {
        callback(null, data);
      } else {
        callback({
          message: {
            data: "Invalid credentials!"
          }
        }, null);
      }
    })
  },

  getSubscribedUsers: function (callback) {
    Subscribe.find({}).exec(function (err, data) {
      if (err) {
        callback(err, null);
      } else if (data) {
        callback(null, data);
      } else {
        callback({
          message: {
            data: "Invalid credentials!"
          }
        }, null);
      }
    });
  },

  isUserSubscribed: function (data, callback) {
    Subscribe.find({
      email: data.email
    }).exec(function (err, data) {
      if (err)
        callback(err, null);
      else if (data && data.length > 0)
        callback(null, "Subscriber found");
      else
        callback({
          message: {
            data: "Invalid credentials"
          }
        }, null);
    });
  },
  saveData: function (data, callback) {
    var Subscribe = this(data);
    Subscribe.timestamp = new Date();
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).exec(function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (updated) {
          callback(null, updated);
        } else {
          callback(null, {});
        }
      });
    } else {
      Subscribe.save(function (err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          callback(null, created);
        } else {
          callback(null, {});
        }
      });
    }
  },
  deleteData: function (data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function (err, deleted) {
      if (err) {
        callback(err, null);
      } else if (deleted) {
        callback(null, deleted);
      } else {
        callback(null, {});
      }
    });
  },
  getAll: function (data, callback) {
    this.find({}).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  getOne: function (data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
      } else {
        callback(null, {});
      }
    });
  },
  findLimited: function (data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function (callback) {
          Subscribe.count({
            email: {
              '$regex': check
            }
          }).exec(function (err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number !== "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function (callback) {
          Subscribe.find({
            email: {
              '$regex': check
            }
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        }
      ],
      function (err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  }
};
module.exports = _.assign(module.exports, exports, model);

