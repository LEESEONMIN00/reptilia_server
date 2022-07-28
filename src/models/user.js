const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    joinedDate: {
        type: Date,
        default: new Date(),
    },
    description: String,
});




UserSchema.methods.serialize = function (user) {
    const data = this.toJSON();
    delete data._id;
    delete data.__v;
    return data;
};

UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );
    return token;
};

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};



const User = mongoose.model('User', UserSchema);

module.exports = User;
