import { Request, Response } from "express";
import profile from "../models/profile";

const SearchController = {
  // Fetch all searches across all profiles
  async getSearches(req: Request, res: Response): Promise<Response> {
    try {
      // Fetch all profiles and extract their searches
      const profiles = await profile.find({}, 'searches').exec();

      // Flatten all searches from different profiles into a single array
      const allSearches = profiles.flatMap(profile => profile.searches);

      // Send the aggregated searches data as the response
      return res.status(200).json(allSearches);
    } catch (error) {
      console.error("Error fetching searches:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Fetch a specific search by search ID
  async getSearchById(req: Request, res: Response): Promise<Response> {
    try {
      const searchId = req.params.searchId;

      if (!searchId) {
        return res.status(400).json({ message: "Search ID is required" });
      }

      // Find the profile containing the specific search ID
      const profileWithSearch = await profile.findOne(
        { "searches._id": searchId },
        { "searches.$": 1 } // Projection to return only the matched search
      ).exec();

      if (!profileWithSearch || !profileWithSearch.searches.length) {
        return res.status(404).json({ message: "Search not found" });
      }

      // Send the specific search data as response
      return res.status(200).json(profileWithSearch.searches[0]);
    } catch (error) {
      console.error("Error fetching search:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default SearchController;
