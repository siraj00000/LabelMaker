import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add a valid email'],
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Company Admin', 'Manufacturer Admin'],
        default: 'Super Admin'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: {
        type: Date,
        default: Date.now() + 3600000 // One hour from now
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date
}, { timestamps: true });
// Encrypt account password before saving to database
accountSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});
// Match account password with stored hash
accountSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// Generate JWT token for account
accountSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, config.jwt.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};
const Account = mongoose.model('Account', accountSchema);
export default Account;
//# sourceMappingURL=accounts.model.js.map