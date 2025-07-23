# Firebase Setup Instructions

## 🚀 Quick Start (Testing Mode)

The system is currently configured to work **without Firebase** for testing purposes. You can:

1. Generate reports and they'll be downloaded normally
2. View mock data in the Reports Overview table
3. Set up Firebase later when ready for production

## � Connect to Your Existing Firebase Project

Since you already have a Firebase project, follow these steps to connect it:

### Step 1: Get Your Firebase Configuration

1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your existing project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" and choose Web (</>)
6. If you already have a web app, click on it to see the config
7. Copy the `firebaseConfig` object

### Step 2: Add Your Firebase Configuration

1. Open `src/config/firebaseConfig.ts`
2. Replace the placeholder values with your actual Firebase project config:

```javascript
export const YOUR_FIREBASE_CONFIG = {
  apiKey: "AIzaSyB-ItJ9PDLjY0T_2SgzOru56RZI6XzCOd4",           // From Firebase Console
  authDomain: "spend-smart-89085.firebaseapp.com",
  projectId: "spend-smart-89085",    // Your Firebase project ID
  storageBucket: "spend-smart-89085.firebasestorage.app",
  messagingSenderId: "561873582903",
  appId: "1:561873582903:web:a9a5b19d455eb90f3738b2"             // From Firebase Console
};
```

**Example of what it should look like:**
```javascript
export const YOUR_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBxxx...your-key-here",
  authDomain: "my-project-12345.firebaseapp.com",
  projectId: "my-project-12345",
  storageBucket: "my-project-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

### Step 3: Verify Storage is Enabled

1. In your Firebase Console
2. Go to "Storage" in the left sidebar
3. If not enabled, click "Get started" and follow setup
4. Make sure you have a storage bucket created

### Step 4: Test the Integration

1. **Start your frontend**: The system will detect if Firebase is configured
2. **Generate a report**: Go to Report page and export as PDF
3. **Check console**: You'll see Firebase upload progress
4. **Verify in Firebase**: Check Storage tab in Firebase Console
5. **View in Reports table**: Go to Reports Overview page

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
};
```

### Step 5: Update Firebase Storage Rules

Your current Firebase Storage rules need to be updated to include reports access. 

**Current Rules (Your Existing):**
```javascript
rules_version = '2';
service firebase.storage {

    
    // Allow read access to all files for public access
    match /{allPaths=**} {
      allow read: if true;
    }
  }


**Updated Rules (Add reports access):**
```javascript
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
    
    // Allow read/write access for reports (public for now, restrict later if needed)
    match /reports/{allPaths=**} {
      allow read, write: if true; // Public access for testing
      // For production, change to: allow read, write: if request.auth != null;
    }
    
    // Allow read access to all other files for public access
    match /{allPaths=**} {
      allow read: if true;
    }
 `

**To Apply These Rules:**
1. Go to Firebase Console > Storage > Rules
2. Replace your current rules with the updated version above
3. Click "Publish" to apply the changes

## 🔧 Current Setup Status

- ✅ Firebase package installed: `npm install firebase`
- ⚠️ Firebase temporarily disabled (`FIREBASE_ENABLED = false`) to prevent errors
- ✅ Mock mode active for testing
- ✅ PDF generation works without Firebase
- ⏳ **Action Required**: Add your actual Firebase config, then enable Firebase

## 📋 Current Testing Mode

1. **Generate a report** - it will download normally with mock storage
2. **Check Reports Overview** - you'll see mock data in the table  
3. **No Firebase errors** - system works offline
4. **When ready**: Add your Firebase config and enable Firebase

## 🚨 To Enable Real Firebase Storage

1. **Add your Firebase config** to `src/config/firebaseConfig.ts`
2. **Change `FIREBASE_ENABLED = false` to `true`** in `src/services/firebaseService.ts`
3. **Update Storage rules** (see Step 5 above)
4. **Test the upload** - reports will go to your Firebase Storage

## 📋 Testing With Your Firebase Project

1. **Add your Firebase config** to `src/services/firebaseService.ts`
2. **Update Storage rules** (see Step 5 above) 
3. **Generate a report** - it will upload to your Firebase Storage
4. **Check Firebase Console** - you'll see the PDF in Storage
5. **View Reports Overview** - table will show real data from database

## 🚨 Important Notes

- **Your existing profile_pictures rules will remain unchanged**
- **New reports folder will be created automatically**
- **Make sure your backend is running** on `https://localhost:7211`
- **Storage rules allow public read access** (as per your current setup)
