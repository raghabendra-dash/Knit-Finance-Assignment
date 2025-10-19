import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
