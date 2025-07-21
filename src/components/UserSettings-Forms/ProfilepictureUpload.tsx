import React, { useState, useEffect } from "react";
import { profilePictureService } from "../UserSettings-Forms/profilePictureService"; // ✅ FIX: Correct path

// ✅ FIX: Proper interface definition
interface ProfilePictureUploadProps {
  onImageUpdate?: (imageUrl: string | null) => void;
}

// ✅ FIX: Add props parameter
const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ onImageUpdate }) => {
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string>("");

    const currentUserId = 8;

    useEffect(() => {
        loadCurrentProfilePicture();
    }, []);

    const loadCurrentProfilePicture = async () => {
        try {
            const response = await profilePictureService.getProfilePictureUrl(currentUserId);
            if (response.profilePictureUrl) {
                setProfileImage(response.profilePictureUrl);
                if (onImageUpdate) {
                    onImageUpdate(response.profilePictureUrl);
                }
            }
        } catch (error) {
            console.error('Error loading profile picture:', error);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        
        if (file.size > 5 * 1024 * 1024) {
            setMessage("File size must be less than 5MB");
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setMessage("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        if (onImageUpdate) {
            onImageUpdate(imageUrl);
        }

        setUploading(true);
        setMessage("Uploading to Firebase...");

        try {
            console.log('Starting upload process...');
            
            const result = await profilePictureService.uploadProfilePicture(file, currentUserId);
            
            if (result.success) {
                setProfileImage(result.profilePictureUrl);
                setMessage("Profile picture uploaded successfully!");
                if (onImageUpdate) {
                    onImageUpdate(result.profilePictureUrl || null);
                }
                console.log("Upload successful:", result);
            }
        } catch (error: any) {
            console.error("Upload failed:", error);
            setMessage("Upload failed: " + error.message);
            loadCurrentProfilePicture();
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your profile picture?")) {
            return;
        }

        setUploading(true);
        setMessage("Deleting...");

        try {
            const result = await profilePictureService.deleteProfilePicture(currentUserId);
            
            if (result.success) {
                setProfileImage(undefined);
                setMessage("Profile picture deleted successfully!");
                if (onImageUpdate) {
                    onImageUpdate(null);
                }
                console.log("Delete successful");
            }
        } catch (error: any) {
            console.error("Delete failed:", error);
            setMessage("Delete failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ margin: "16px 0", padding: "8px" }}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                    backgroundColor: uploading ? "#ccc" : "#1976d2",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: uploading ? "not-allowed" : "pointer",
                    marginRight: "12px",
                    marginLeft: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                }}
            >
                {uploading ? "Uploading..." : "Upload Picture"}
            </button>

            <button
                onClick={handleDelete}
                disabled={uploading || !profileImage} // ✅ FIX: Changed from ProfileImage to !profileImage
                style={{
                    backgroundColor: uploading || !profileImage ? "#ccc" : "#d32f2f", // ✅ FIX: Same here
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: uploading || !profileImage ? "not-allowed" : "pointer", // ✅ FIX: Same here
                    fontSize: "14px",
                    fontWeight: "500",
                    marginRight: "8px",
                }}
            >
                Delete Picture
            </button>

            {message && (
                <div
                    style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        fontSize: "14px",
                        backgroundColor: message.includes("successfully") ? "#d4edda" : "#f8d7da",
                        color: message.includes("successfully") ? "#155724" : "#721c24",
                        border: message.includes("successfully") ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default ProfilePictureUpload;