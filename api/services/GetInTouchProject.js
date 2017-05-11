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
  }
});

// schema.plugin(deepPopulate, {});
// schema.plugin(uniqueValidator);
// schema.plugin(timestamps);
module.exports = mongoose.model('GetInTouchProject', schema);

// var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getProjects: function (callback) {
    GetInTouchProject.find({}).exec(function (err, data) {
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

  setProjectEnquiry: function (data, callback) {
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
  }
};
module.exports = _.assign(module.exports, exports, model);

