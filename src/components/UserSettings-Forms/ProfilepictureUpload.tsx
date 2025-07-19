import React, { useState } from "react";
import {
  storage,
  ensureAuthenticated,
} from "../../pages/UserSettings/firebaseconfig"; // import the initialized Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios"; // For making API requests to your backend
import ProfileImage from "../../assets/images/profile-photo.jpg"; // default image

const ProfilePictureUpload: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    ProfileImage
  ); // state for storing image URL
  const fileInputRef = React.useRef<HTMLInputElement | null>(null); // Ref for file input
  const [uploading, setUploading] = useState(false); // State for uploading status

  const API_BASE_URL = "https://localhost:7211/api";

  // Handle file change and upload it
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Create a local URL for the image preview
    setProfileImage(imageUrl); // Update preview

    setUploading(true); // Set uploading to true while processing

    try {
      // Ensure user is authenticated before uploading
      await ensureAuthenticated();

      // Create a unique filename to avoid conflicts
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;

      // Create a reference in Firebase Storage for the file upload
      const storageRef = ref(storage, `profile_pictures/${fileName}`);

      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL after upload
      const downloadUrl = await getDownloadURL(storageRef);

      // Optionally, call an API to save the URL to the backend (DB)
      await saveProfilePictureUrlToBackend(downloadUrl);

      setProfileImage(downloadUrl); // Update state with the Firebase URL
      console.log("Upload successful:", downloadUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false); // Set uploading to false after process
    }
  };

  // Save the profile picture URL to backend
  const saveProfilePictureUrlToBackend = async (url: string) => {
    try {
      await axios.put("/api/user/profile-picture-url", {
        profilePictureUrl: url,
      });
      console.log("Profile picture URL saved to backend.");
    } catch (error) {
      console.error("Error saving profile picture URL to backend:", error);
    }
  };

  //new constant

  const handleDelete = async () => {
    try {
      // Ensure user is authenticated before deleting
      await ensureAuthenticated();

      await axios.delete("/api/user/profile-picture-url");
      setProfileImage(ProfileImage); // Reset to default
      console.log("Profile picture deleted.");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div style={{ margin: "16px 0", padding: "8px" }}>
      {/* File input - triggers file selection */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange} // Handle the file selection
      />

      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "12px",
          marginLeft: "8px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {uploading ? "Uploading..." : "Upload Picture"}
      </button>

      {/* Display the uploaded profile picture */}
      {/*<img src={profileImage} alt="Profile" width="100" height="100" />*/}

      {/* Optionally, you can add a Delete button to remove the profile image */}
      <button
        onClick={async () => {
          // Call backend to delete the image (optional)
          await axios.delete("/api/user/profile-picture-url");

          // Reset to default image
        }}
        style={{
          backgroundColor: "#d32f2f",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          marginRight: "8px",
        }}
      >
        Delete Picture
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
