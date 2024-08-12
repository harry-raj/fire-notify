// Context - Notifications
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { INotification } from "@/@core/interfaces";

interface INotificationContextType {
  notifications: INotification[];
  addNotification: (notification: INotification) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

// Context for managing notifications.
const NotificationContext = createContext<INotificationContextType | undefined>(
  undefined
);

const notificationsCollection = collection(db, "notifications");

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // Fetch notifications from Firestore.
  const fetchNotifications = async () => {
    try {
      const snapshot = await getDocs(notificationsCollection);
      const notificationsList: INotification[] = snapshot?.docs?.map(
        (doc) => ({ id: doc?.id, ...doc?.data() } as INotification)
      );
      setNotifications(notificationsList);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  const addNotification = async (notification: INotification) => {
    try {
      const res = await addDoc(notificationsCollection, notification);

      // Send a notification to the device using browser's notification API.
      if (res?.id) {
        new Notification(notification.title, {
          body: notification.body,
        });
      }
      await fetchNotifications();
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const notificationDoc = doc(db, "notifications", id);
      await updateDoc(notificationDoc, { read: true });
      await fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read: ", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): INotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
