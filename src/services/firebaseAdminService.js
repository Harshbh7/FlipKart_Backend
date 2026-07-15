import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url for path resolution in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the service account key
const serviceAccountPath = path.join(__dirname, '../config/serviceAccountKey.json');

let app = null;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
    app = initializeApp({
      credential: cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } else {
    console.warn('Firebase Admin SDK not initialized: serviceAccountKey.json not found in config directory.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin:', error);
}

/**
 * Send a push notification to a specific device.
 * @param {string} token - FCM registration token of the target device.
 * @param {string} title - Title of the notification.
 * @param {string} body - Body content of the notification.
 * @param {object} data - Optional custom key-value pairs (must be strings).
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export const sendPushNotification = async (token, title, body, data = {}) => {
  if (!app) {
    console.warn('Cannot send notification: Firebase Admin SDK is not initialized.');
    return false;
  }
  if (!token) {
    console.warn('Cannot send notification: No FCM token provided.');
    return false;
  }

  // Admin SDK requires data object values to be strings
  const stringifiedData = {};
  for (const key in data) {
    stringifiedData[key] = String(data[key]);
  }

  const message = {
    notification: {
      title,
      body,
    },
    data: stringifiedData,
    token: token,
  };

  try {
    const messaging = getMessaging(app);
    const response = await messaging.send(message);
    console.log('Successfully sent push notification:', response);
    return true;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
};

/**
 * Verify a Firebase ID token
 * @param {string} idToken - The token sent from the client
 * @returns {Promise<object>} Decoded token payload
 */
export const verifyFirebaseToken = async (idToken) => {
  if (!app) {
    throw new Error('Firebase Admin SDK is not initialized');
  }
  try {
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    throw new Error('Invalid Firebase token');
  }
};

