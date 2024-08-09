importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-messaging-compat.js');

let firebaseConfig = {};

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'INIT') {
    firebaseConfig = event.data.config;
    firebase.initializeApp(firebaseConfig);

    if (firebase.messaging.isSupported()) {
      console.log('Firebase Messaging initialized');
    }
  }
});

self.addEventListener('install', () => {
  // Perform install steps
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // Perform activate steps
  self.clients.claim();
});

self.addEventListener('push', (event) => {
  try {
    const payload = event.data.json();
    console.log('[firebase-messaging-sw.js] Received push message', payload);

    const { notification } = payload;

    const notificationTitle = notification?.title || 'Default Title';

    const notificationOptions = {
      body: notification?.body,
    };

    event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));

    
    new Notification(notificationTitle, {
      body: notification?.body,
    });

  } catch (error) {
    console.error('Error handling push event:', error);
  }
});
