import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js", {
        scope: "/firebase-cloud-messaging-push-scope",
      })
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );

        // Send the configuration data to the service worker
        if (registration) {
          // Check if the service worker is in the activated state
          if (registration.active) {
            registration.active.postMessage({
              type: "INIT",
              config: {
                apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
                authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
                projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
                storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: import.meta.env
                  .VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
                appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
              },
            });
          } else {
            // Listen for the service worker to become active
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                  type: "INIT",
                  config: {
                    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
                    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
                    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
                    storageBucket: import.meta.env
                      .VITE_APP_FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: import.meta.env
                      .VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
                    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
                  },
                });
              }
            });
          }
        }
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
};

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY,
      });

      return token;
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};
