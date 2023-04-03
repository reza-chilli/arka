const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName : {
      type : String,
      required : true,
      trim : true
    },
    lastName : {
      type : String,
      required : true,
      trim : true
    },
    username : {
      type : String,
      required : true,
      trim : true
    },
    password : {
      type : String,
      required : true,
      trim : true
    },
    phonenumber : {
      type : String,
      required : true,
      trim : true
    },
    role : {
      type : String,
      default : 'qcAgent'
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    if (this.isNew || this.isModified('password')) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          return next();
        });
    });
    } else {
      return next();
    }
  })

module.exports = mongoose.model('User', userSchema);