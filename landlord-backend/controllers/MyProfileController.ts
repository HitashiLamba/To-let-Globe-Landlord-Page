import profile from "../models/profile";
import { Request, Response } from "express";


const MyProfileController = async (req: Request, res: Response) => {
  try {
    // Fetch the profile document from the database
    const userProfile = await profile.findOne(); // Assuming there is only one document

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Send the profile data as a JSON response
    res.json(userProfile);
  } catch (error) {
    // Handle errors and send a response with an error message
    res.status(500).json({ message: "Error fetching profile data", error });
  }
};

export default MyProfileController;
