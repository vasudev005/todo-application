const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'member'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    productivityGoal: {
      type: Number,
      default: 5
    },
    preferences: {
      dailyDigest: {
        type: Boolean,
        default: true
      },
      browserNotifications: {
        type: Boolean,
        default: true
      },
      motivationalQuotes: {
        type: Boolean,
        default: true
      }
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function saveHook(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
