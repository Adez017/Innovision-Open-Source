# Firebase Setup Guide

This guide will help you set up Firebase for the Innovision project.

## Prerequisites

- A Google account
- Node.js installed on your machine

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., `innovision-yourname`)
4. Click **"Continue"**
5. (Optional) Disable Google Analytics if you don't need it
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Enable Required Services

### Enable Firestore Database

1. In the Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"** → **Next**
4. Choose a location close to your users
   - ⚠️ **Note**: You cannot change this location later!
5. Click **"Enable"**
6. Wait for the database to be created (30-60 seconds)

### Enable Authentication

1. Go to **Build** → **Authentication**
2. Click **"Get started"**
3. Enable the authentication providers you need:

   **Google Authentication:**
   - Click on **"Google"** in the providers list
   - Toggle **"Enable"**
   - Select a support email from the dropdown
   - Click **"Save"**

   **GitHub Authentication (Optional):**
   - Click on **"GitHub"**
   - Toggle **"Enable"**
   - Copy the **Authorization callback URL** (you'll need this)
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click **"New OAuth App"**
   - Fill in:
     - **Application name**: `Innovision` (or your app name)
     - **Homepage URL**: `http://localhost:3000` (for development)
     - **Authorization callback URL**: Paste the URL from Firebase
   - Click **"Register application"**
   - Copy the **Client ID** and **Client Secret** from GitHub
   - Paste them back into Firebase
   - Click **"Save"**

### Enable Cloud Firestore API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** → **Enable APIs and Services**
4. Search for **"Cloud Firestore API"**
5. Click **"Enable"**
6. Wait 5-10 minutes for the API to propagate

## Step 3: Set Up Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with the following:

**For Development (allows all access):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**For Production (secure rules):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Published courses - anyone can read
    match /published_courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users collection - users can only access their own data  
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.token.email == userId;
    }
    
    // Gamification - users can only access their own stats
    match /gamification/{userId} {
      allow read, write: if request.auth != null && request.auth.token.email == userId;
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **"Publish"**

## Step 4: Get Firebase Configuration

### Client-Side Configuration

1. In Firebase Console, click the **gear icon** (⚙️) → **Project settings**
2. Scroll down to **"Your apps"** section
3. If you don't have a web app yet:
   - Click **"Add app"** → Choose **Web** (`</>` icon)
   - Give it a nickname (e.g., "Innovision Web")
   - **Don't check** "Also set up Firebase Hosting" (unless you want it)
   - Click **"Register app"**
4. Copy the Firebase configuration values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.firebasestorage.app",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef",
     measurementId: "G-XXXXXXXXXX"
   };
   ```

### Server-Side Configuration (Firebase Admin)

1. In Firebase Console, go to **Project settings** → **Service accounts** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"** (a JSON file will download)
4. **Keep this file secure! Don't commit it to Git!**
5. You'll need these values from the JSON file:
   - `project_id`
   - `client_email`
   - `private_key`

## Step 5: Configure Environment Variables

1. In your project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the `.env` file with your Firebase configuration:

```bash
# Client-side Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=your-project-id
NEXT_PUBLIC_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_APP_ID=your_app_id
NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id

# Server-side Firebase Admin Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Gemini API Key (for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important Notes:**
- The `FIREBASE_PRIVATE_KEY` must include the quotes and `\n` characters
- Never commit your `.env` file to Git (it's in `.gitignore`)
- For production, use environment variables in your hosting platform

## Step 6: Install Dependencies and Run

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The app should now be running at `http://localhost:3000`

## Troubleshooting

### "SERVICE_DISABLED" Error
- Make sure you've enabled the Cloud Firestore API
- Wait 5-10 minutes for the API to propagate
- Check [Google Cloud Console](https://console.cloud.google.com/) to verify the API is enabled

### "Missing or insufficient permissions" Error
- Check your Firestore security rules
- For development, use the permissive rules shown above
- Make sure the rules are published

### Authentication Not Working
- Verify authentication providers are enabled in Firebase Console
- Check that your redirect URLs are correctly configured
- For GitHub OAuth, ensure the callback URL matches exactly

### Course Content Not Loading
- Make sure Firestore database is created (not just API enabled)
- Check that security rules allow reading from `published_courses` collection
- Verify your Firebase Admin credentials are correct

## Next Steps

- Add courses through the Studio feature in the app
- Publish courses to make them available in the browse section
- Set up proper security rules before deploying to production
- Consider setting up Firebase Hosting for deployment

## Security Reminder

⚠️ **Important**: The development Firestore rules allow anyone to read/write to your database. Before deploying to production, always update to the secure production rules!
