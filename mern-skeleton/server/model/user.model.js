import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt'; 

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
});


UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

UserSchema.methods = {
  authenticate: function(plainText) {
    const result = this.encryptPassword(plainText) === this.hashed_password;

    if (!result && this.hashed_password.length === 40) {
      const isUpdated = this.updatePasswordUsingBcrypt(plainText);
      return isUpdated;
    }

    return result;
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      console.error('Error in encryptPassword:', err);
      return '';
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  
  updatePasswordUsingBcrypt: async function(plainText) {
    try {
      const saltRounds = 10;
      const newSalt = await bcrypt.genSalt(saltRounds);
      const newHashedPassword = await bcrypt.hash(plainText, newSalt);

      this.hashed_password = newHashedPassword;
      this.salt = newSalt;
      await this.save();

      return true;
    } catch (err) {
      console.error( err);
      return false;
    }
  },
};

//UserSchema.methods.removeUser = async function () {
 // return await this.deleteOne();
//};

export default mongoose.model('User', UserSchema);
