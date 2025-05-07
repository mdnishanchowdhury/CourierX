const Parcel = require("../models/Parcel");


// Create a new parcel
const createParcel = async (req, res) => {
  try {
    const newParcel = new Parcel(req.body); // Fixed: added `new`
    const parcel = await newParcel.save();
    res.status(201).json(parcel);
  } catch (error) {
    console.error("Create Parcel Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all parcels
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    console.error("Get All Parcels Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get a single parcel by ID
const getOneParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id); // Fixed: req.params
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }
    res.status(200).json(parcel);
  } catch (error) {
    console.error("Get One Parcel Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all parcels by a user's email
const getUserParcel = async (req, res) => {
  try {
    const parcels = await Parcel.find({ senderemail: req.body.email }).sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    console.error("Get User Parcel Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// // Update a parcel
// const updateParcel = async (req, res) => {
//   try {
//     const updatedParcel = await Parcel.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedParcel) {
//       return res.status(404).json({ message: "Parcel not found" });
//     }
//     res.status(200).json(updatedParcel);
//   } catch (error) {
//     console.error("Update Parcel Error:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };


const updateParcel = async (req, res) => {
  const { status, feedback } = req.body;
  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      { status, feedback }, // Update status and feedback
      { new: true }  // Return the updated parcel
    );

    if (!updatedParcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json(updatedParcel); // Respond with the updated parcel
  } catch (error) {
    console.error("Error updating parcel: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// Delete a parcel
const deleteParcel = async (req, res) => {
  try {
    const deleted = await Parcel.findByIdAndDelete(req.params.id); // Fixed typo
    if (!deleted) {
      return res.status(404).json({ message: "Parcel not found" });
    }
    res.status(200).json("Parcel has been deleted successfully");
  } catch (error) {
    console.error("Delete Parcel Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createParcel,
  getAllParcels,
  getOneParcel,
  getUserParcel,
  updateParcel,
  deleteParcel,
};
