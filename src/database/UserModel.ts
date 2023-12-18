import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: string, required: true },
  email: { type: string, required: true },
  authentication: {
    password: { type: string, required: true, select: false },
    salt: { type: string, select: false },
    session_token: { type: string, select: false },
  },
});

export const UserModel = mongoose.model("User", userSchema);

// CRUD
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (session_token: string) =>
  UserModel.findOne({
    "authentication.session_token": session_token,
  });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
