import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        profileImage: {
            type: String,
        },
        follower_count: {
            type: Number,
        },
        following_count: {
            type: Number,
        },
        bio: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

export const User = model("User", userSchema);
