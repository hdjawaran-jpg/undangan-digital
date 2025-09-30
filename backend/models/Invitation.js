import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  template: {
    type: String,
    required: true
  },
  data: {
    // Basic Info
    brideName: String,
    groomName: String,
    brideParents: String,
    groomParents: String,
    
    // Event Details
    date: String,
    time: String,
    venue: String,
    address: String,
    
    // Design
    themeColor: String,
    fontFamily: String,
    
    // Message
    message: String,
    
    // Gallery
    images: [String],
    
    // RSVP
    rsvpDeadline: String,
    rsvpPhone: String
  },
  settings: {
    isPublished: {
      type: Boolean,
      default: false
    },
    password: String,
    allowComments: {
      type: Boolean,
      default: true
    }
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    rsvpYes: {
      type: Number,
      default: 0
    },
    rsvpNo: {
      type: Number,
      default: 0
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Invitation', invitationSchema);