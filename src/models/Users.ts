import { Schema, model } from 'mongoose';

interface IUser {
    userName: string,
    password: string,
    email: string,
    createdAt: Date
}

const userSchema = new Schema<IUser>(
    {
        userName: {type: String, unique: true,  required: true},
        password: {type: String, required: true},
        email: {type: String, lowercase: true, unique: true, required: true},
        createdAt: {type: Date, default: Date.now}
    }
)

const User = model<IUser>('User', userSchema);
export default User;