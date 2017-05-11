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
  }
};
module.exports = _.assign(module.exports, exports, model);

