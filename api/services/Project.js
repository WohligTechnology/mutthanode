var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  thumbimage: {
    type: String,
    default: ""
  },
  banner: {
    type: String,
    default: ""
  },
  bannerlogo: {
    type: String,
    default: ""
  },
  projectname: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  designFeature: {
    type: String,
    default: ""
  },
  specification: {
    type: String,
    default: ""
  },
  keyDistance: {
    type: String,
    default: ""
  },
  // images: {
  //   type: String,
  //   default: ""
  // },
  images: [{
    image: String
  }],
  order: Number,
  status: {
    type: String,
    default: "Enabled"
  }

});

module.exports = mongoose.model('Project', schema);
var models = {
  sort: function (data, callback) {
    function callSave(num) {
      Project.saveData({
        _id: data[num],
        order: num + 1
      }, function (err, respo) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          num++;
          if (num == data.length) {
            callback(null, {
              comment: "Data sorted"
            });
          } else {
            callSave(num);
          }
        }
      });
    }
    if (data && data.length > 0) {
      callSave(0);
    } else {
      callback(null, {});
    }
  },
  saveData: function (data, callback) {
    var project = this(data);
    project.timestamp = new Date();
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
      project.save(function (err, created) {
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
          Project.count({
            projectname: {
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
          Project.find({
            projectname: {
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

module.exports = _.assign(module.exports, models);

