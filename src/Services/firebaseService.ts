// Firebase configuration
import { YOUR_FIREBASE_CONFIG } from '../config/firebaseConfig';

let app: any = null;
let storage: any = null;
let firebaseImports: any = null;

// Enable Firebase for production use (set to false for testing without Firebase)
const FIREBASE_ENABLED = true; // ✅ Enabled with your Firebase project configuration

// Use your Firebase project configuration
const firebaseConfig = YOUR_FIREBASE_CONFIG;

// Initialize Firebase with dynamic imports to handle missing packages gracefully
const initializeFirebase = async () => {
  try {
    // Check if Firebase config has been updated from defaults
    const isConfigured = firebaseConfig.apiKey && 
                         !firebaseConfig.apiKey.includes('paste-your') &&
                         !firebaseConfig.apiKey.includes('your-actual') &&
                         firebaseConfig.projectId &&
                         !firebaseConfig.projectId.includes('your-project-id');

    if (!isConfigured) {
      console.warn("⚠️ Firebase config not updated yet. Please update src/config/firebaseConfig.ts with your actual Firebase project details.");
      console.log("📝 Using mock mode until Firebase is configured.");
      return false;
    }

    // Try to import Firebase modules
    const firebaseApp = await import('firebase/app');
    const firebaseStorage = await import('firebase/storage');
    
    firebaseImports = {
      initializeApp: firebaseApp.initializeApp,
      getStorage: firebaseStorage.getStorage,
      ref: firebaseStorage.ref,
      uploadBytes: firebaseStorage.uploadBytes,
      getDownloadURL: firebaseStorage.getDownloadURL
    };

    app = firebaseImports.initializeApp(firebaseConfig);
    storage = firebaseImports.getStorage(app);
    console.log("🔥 Firebase initialized successfully with your project:", firebaseConfig.projectId);
    return true;
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    console.log("📝 Falling back to mock mode");
    return false;
  }
};

// Initialize Firebase when service is loaded
let firebaseReady = false;
if (FIREBASE_ENABLED) {
  initializeFirebase().then(success => {
    firebaseReady = success;
  });
}

// Upload PDF to Firebase Storage
export const uploadPDFToFirebase = async (
  pdfBlob: Blob, 
  fileName: string, 
  userId: number
): Promise<string> => {
  try {
    if (!FIREBASE_ENABLED || !firebaseReady || !storage || !firebaseImports) {
      // Mock implementation for testing
      console.log("🔄 Mock Firebase upload (Firebase disabled or not initialized)...");
      console.log(`📁 Would upload: ${fileName} for user ${userId}`);
      console.log(`📊 File size: ${(pdfBlob.size / 1024 / 1024).toFixed(2)} MB`);
      
      // Return a mock URL
      const mockUrl = `https://mock-storage.example.com/reports/user_${userId}/${fileName}`;
      console.log("✅ Mock upload complete:", mockUrl);
      return mockUrl;
    }

    // Real Firebase upload to your existing project
    console.log("🔄 Uploading PDF to your Firebase Storage...");
    console.log(`� Project: ${firebaseConfig.projectId}`);
    console.log(`📦 Storage Bucket: ${firebaseConfig.storageBucket}`);
    console.log(`�📁 File: ${fileName}`);
    console.log(`👤 User: ${userId}`);
    console.log(`📊 Size: ${(pdfBlob.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📂 Upload Path: reports/user_${userId}/${fileName}`);
    
    // Create a reference to the file location in your existing Firebase project
    // Using reports folder to organize report files
    const storageRef = firebaseImports.ref(storage, `reports/user_${userId}/${fileName}`);
    
    // Upload the file with metadata
    const metadata = {
      contentType: 'application/pdf',
      customMetadata: {
        'uploadedBy': `user_${userId}`,
        'fileType': 'financial_report',
        'uploadDate': new Date().toISOString()
      }
    };
    
    const snapshot = await firebaseImports.uploadBytes(storageRef, pdfBlob, metadata);
    console.log("✅ PDF uploaded successfully to Firebase:", snapshot.metadata.fullPath);
    
    // Get the download URL
    const downloadURL = await firebaseImports.getDownloadURL(snapshot.ref);
    console.log("✅ Firebase Storage URL:", downloadURL);
    
    return downloadURL;
  } catch (error: any) {
    console.error("❌ Error uploading to Firebase Storage:", error);
    
    // Provide helpful error messages
    if (error.code === 'storage/unauthorized') {
      console.error("🔒 Firebase Storage Rules Issue:");
      console.error(`🔥 Project: ${firebaseConfig.projectId}`);
      console.error(`📦 Storage Bucket: ${firebaseConfig.storageBucket}`);
      console.error(`📂 Blocked Path: reports/user_${userId}/${fileName}`);
      console.error("📋 SOLUTION:");
      console.error("1. Go to Firebase Console > Storage > Rules");
      console.error("2. Add this rule for reports folder:");
      console.error("   match /reports/{allPaths=**} { allow read, write: if true; }");
      console.error("3. Click 'Publish' to save changes");
      console.error("4. Wait 1-2 minutes for rules to propagate");
      throw new Error(`Firebase Storage: Unauthorized access to reports folder in project ${firebaseConfig.projectId}. Please update your storage rules.`);
    } else if (error.code === 'storage/canceled') {
      throw new Error('Firebase Storage: Upload was canceled.');
    } else if (error.code === 'storage/unknown') {
      throw new Error('Firebase Storage: Unknown error occurred.');
    } else if (error.code === 'storage/retry-limit-exceeded') {
      throw new Error('Firebase Storage: Upload failed after multiple retries. Check your internet connection.');
    }
    
    throw new Error(`Firebase Storage Error: ${error.message || error}`);
  }
};
