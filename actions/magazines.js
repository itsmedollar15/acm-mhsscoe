"use server";
import { connectDB } from "@/config/database";
import Magazine from "@/models/magazine";

export const getAllmagazines = async () => {
  try {
    await connectDB();
    let magazines = await Magazine.find();
    if (!magazines) throw { status: 404, message: "No Magazines found" };

    magazines = magazines.map((magazine) => {
      magazine = magazine.toObject();
      magazine._id = magazine._id.toString();
      magazine.thumbnail = magazine.pages[0];
      delete magazine.pages;
      return magazine;
    });

    return magazines;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

export const getMagazineDetails = async (magazineId) => {
  try {
    await connectDB();
    let magazine = await Magazine.findById(magazineId);
    if (!magazine) throw { status: 404, message: "Magazine not found" };

    magazine = magazine.toObject();
    magazine._id = magazine._id.toString();

    return magazine;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};
