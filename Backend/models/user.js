const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true,
    },
    employeeNumber: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        default: null,
        unique: true
    },
    shirtSize: {
        type: String,
        default: null
    },
    jacketSize: {
        type: String,
        default: null
    },
    passportExpires: {
        type: String,
        default: null
    },
    position: {
        type: String,
        required: true,
        enum: ['Mechanic', 'Avionics', 'New Hire'],
        default: 'New Hire',
        
    },
    duties: {
        type: [String]
    },
    role: {
        type: String,
        required: true,
        default: 'User',
        enum: ['User', 'Admin']
    }

}, {collection: 'Users'});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(passwd, cb) {
    bcrypt.compare(passwd, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);