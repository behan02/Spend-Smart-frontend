# Firebase Storage Rules for SpendSmart Reports

## 🔥 **Current Issue**: Unauthorized access to reports folder

### **Problem**:

Firebase Storage rules don't allow writes to the `reports/` folder, causing uploads to fail with error:

```
Firebase Storage: User does not have permission to access 'reports/user_1/filename.pdf'
```

### **Solution**: Update Firebase Storage Rules

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: `spend-smart-89085`
3. **Navigate**: Storage > Rules tab
4. **Replace current rules** with one of these options:

---

## **Option 1: Secure Rules (Recommended for Production)**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Reports folder - allow authenticated users
    match /reports/{allPaths=**} {
      allow read, write: if request.auth != null;
    }

    // Profile pictures (your existing rules)
    match /profile_pictures/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Default: read-only access
    match /{allPaths=**} {
      allow read: if true;
    }
  }
}
```

---

## **Option 2: Testing Rules (For Development Only)**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // TESTING ONLY - Open access to reports folder
    match /reports/{allPaths=**} {
      allow read, write: if true;
    }

    // Profile pictures (your existing rules)
    match /profile_pictures/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Default: read-only access
    match /{allPaths=**} {
      allow read: if true;
    }
  }
}
```

---

## **Option 3: Completely Open (For Quick Testing)**

⚠️ **WARNING**: Only use for testing! Makes storage completely public.

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

---

## **After Updating Rules:**

1. Click **"Publish"** to save changes
2. Wait 1-2 minutes for rules to propagate
3. Test report generation again
4. Check browser console for success messages

---

## **Expected File Structure After Upload:**

```
your-firebase-storage/
├── reports/
│   ├── user_1/
│   │   ├── SpendSmart-Report-2024-01-01-to-2025-07-23-2025-07-23.pdf
│   │   └── SpendSmart-Report-2024-06-01-to-2025-07-23-2025-07-23.pdf
│   └── user_2/
│       └── SpendSmart-Report-2024-01-01-to-2025-07-23-2025-07-23.pdf
└── profile_pictures/ (your existing files)
```

---

## **Verification Steps:**

1. ✅ Generate a report in the app
2. ✅ Download PDF (should work)
3. ✅ Check console for Firebase upload success
4. ✅ Go to Firebase Console > Storage > Files
5. ✅ Verify PDF appears in `reports/user_X/` folder
6. ✅ Check Reports Overview page for stored report entry

---

## **Common Issues:**

| Error                          | Solution                             |
| ------------------------------ | ------------------------------------ |
| `storage/unauthorized`         | Update storage rules as above        |
| `storage/retry-limit-exceeded` | Check internet connection            |
| `storage/canceled`             | File upload was interrupted          |
| `storage/unknown`              | Check Firebase project configuration |

---

**Last Updated**: July 23, 2025
**Project**: spend-smart-89085.firebasestorage.app
