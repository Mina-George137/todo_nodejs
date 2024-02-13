const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  this.password = this.password+this._id+process.env.PEPPER ;
  console.log(this.password);
  this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT));
  console.log(this.password);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, storedPassword) {
  candidatePassword = candidatePassword+this._id+process.env.PEPPER;
  return await bcrypt.compare(candidatePassword, storedPassword);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;