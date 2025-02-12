import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import fs from "fs";

// models
// users
import UsersModel from "../models/users.model";
// profiles
import ProfilesModel from "../models/profiles.model";

// get profiles
const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await ProfilesModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetail",
        },
      },
      {
        $unwind: "$userDetail",
      },
      {
        $group: {
          _id: "$user",
          profiles: {
            $push: {
              _id: "$_id",
              file: "$file",
              flag: "$flag",
            },
          },
        },
      },
      {
        $project: {
          user: "$_id",
          profiles: 1,
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({ profiles });
  } catch (err) {
    return res.status(400).json({ error: "get profiles error" });
  }
};

// new profile
const newProfile = async (req: Request, res: Response) => {
  try {
    const user = req._id;
    const { flag } = req.body;
    const isUserExist = await UsersModel.findById(user);
    if (!isUserExist) {
      return res
        .status(400)
        .json({ error: "user not exist to upload profile" });
    }
    const folder = `lm/uploads/profiles/${isUserExist.username}`;
    if (!req.file?.path) {
      return res.status(400).json({ error: "Please select file" });
    }
    const isProfileExist = await ProfilesModel.findOne({ user, flag });

    if (isProfileExist) {
      console.log(isProfileExist);
      await cloudinary.uploader.destroy(isProfileExist.public_id);
      const result = await cloudinary.uploader.upload(
        req.file?.path as string,
        { folder }
      );
      const updatedProfile = await ProfilesModel.findByIdAndUpdate(
        isProfileExist._id,
        { file: result.secure_url, public_id: result.public_id },
        { new: true, runValidators: true }
      );
      fs.unlinkSync(req.file?.path as string);
      return res.status(200).json({
        updatedProfile: {
          user: updatedProfile.user,
          file: updatedProfile.file,
          flag: updatedProfile.flag,
          _id: updatedProfile._id,
        },
      });
    } else {
      const result = await cloudinary.uploader.upload(
        req.file?.path as string,
        { folder }
      );

      const { secure_url, public_id } = result;
      fs.unlinkSync(req.file?.path as string);
      const newPro = await ProfilesModel.create({
        user,
        file: secure_url,
        public_id,
        flag,
      });
      return res.status(200).json({
        newProfile: {
          user: newPro.user,
          file: newPro.file,
          flag: newPro.flag,
          _id: newPro._id,
        },
      });
    }
  } catch (err) {
    return res.status(400).json({ error: "new profile error" });
  }
};

// delete profile
const deleteProfile = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Delete Profile" });
};

// exports
export { getProfiles, newProfile, deleteProfile };
