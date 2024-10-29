import mongoose, { Schema, model } from "mongoose";

const userFollowersModelSchema = new Schema(
    {
        follower: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const UserFollowers = model("UserFollowers", userFollowersModelSchema);
