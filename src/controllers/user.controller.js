import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path";
// import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation (every field should be non empty)
    // check if user already exists
    // check for images and avatars
    // upload them to cloudinary
    // create user object
    // remove password and refresh token field from response
    // check for user creation
    // response

    const { fullName, username, email, password } = req.body;

    if (
        [fullName, username, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "email or username already exists");
    }

    let profileImageLocalPath = req?.file?.path;
    let profileImage;

    if (profileImageLocalPath) {
        profileImage = await uploadOnCloudinary(profileImageLocalPath);
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        profileImage:
            profileImage?.secure_url ||
            path.resolve("./public/default/defaultProfileImage.png"),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Internal Server Error");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User created Successfully"));
});

export { registerUser };
