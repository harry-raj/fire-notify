// App
import { useEffect } from "react";

import { registerServiceWorker, requestPermissionAndGetToken } from "@/@core/utils";
import { NotificationProvider } from "@/contexts/notification-context";

import { Navbar, NotificationButtons } from "@/components";

const App = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      await registerServiceWorker();

      try {
        const token = await requestPermissionAndGetToken();
        if (token) {
          console.log('fcmToken', token);
        }
      } catch (error) {
        console.error('Error initializing notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  return (
    <>
      <NotificationProvider>
        <Navbar />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-10">
          <NotificationButtons />
        </div>
      </NotificationProvider>
    </>
  );
};

export default App;
