var schema = new Schema({
  title: {
    type: String,
    required: true,
    excel: {
      name: "Title"
    }
  },
  overview: {
    type: String,
    required: true,
    default: ""
  },
  management: [{
    name: String,
    image: String,
    description: String
  }],
  mission: String,
  philosophy: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Know', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  saveKnow: function (data, callback) {
    Know.saveData(data, function (err, data) {
      if (err) {
        callback(err, null);
      } else if (data) {
        callback(null, {
          message: {
            data: "Saved successfully"
          }
        });
      } else {
        callback({
          message: {
            data: "Invalid credentials!"
          }
        }, null);
      }
    })
  }
};
module.exports = _.assign(module.exports, exports, model);

