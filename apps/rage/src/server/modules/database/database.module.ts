import { Schema, model } from 'mongoose';

interface IRageUser {
  socialClub: string;
  username: string;
  money: number;
  bank: number;
}

const rageUserSchema = new Schema<IRageUser>({
  socialClub: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  money: { type: Number, default: 5000 },
  bank: { type: Number, default: 25000 }
});

export const RageUser = model<IRageUser>('RageUser', rageUserSchema);