var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true,
    excel: {
      name: "Name"
    }
  },
  email: {
    type: String,
    required: true
  },
  enquiry: {
    type: String,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    default: "Enabled"
  }
});

// schema.plugin(deepPopulate, {});
// schema.plugin(uniqueValidator);
// schema.plugin(timestamps);
module.exports = mongoose.model('GetInTouchProject', schema);

// var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getProjects: function (callback) {
    GetInTouchProject.find({}).populate('project').exec(function (err, data) {
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

  setGetInTouchProjectEnquiry: function (data, callback) {
    GetInTouchProject.saveData(data, function (err, data) {
      if (err) {
        callback(err, null);
      } else if (data) {
        callback(null, {
          message: {
            data: "Message entered successfully"
          }
        });
      } else {
        callback({
          message: {
            data: "Invalid credentials!"
          }
        }, null);
      }
    });
  },
  saveData: function (data, callback) {
    var GetInTouchProject = this(data);
    GetInTouchProject.timestamp = new Date();
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).populate('project').exec(function (err, updated) {
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
      GetInTouchProject.save(function (err, created) {
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
    this.find({}).populate('project').exec(function (err, found) {
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
    }).populate('project').exec(function (err, found) {
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
          GetInTouchProject.count({
            name: {
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
          GetInTouchProject.find({
            name: {
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

