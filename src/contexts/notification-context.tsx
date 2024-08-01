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

// Collection reference for the notifications collection.
const notificationsCollection = collection(db, "notifications");

/**
 * A React context provider for managing notifications.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @return {JSX.Element} The NotificationProvider component.
 */
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

  /**
   * Add a new notification.
   * @param {INotification} notification - The notification to add.
   */
  const addNotification = async (notification: INotification) => {
    try {
      await addDoc(notificationsCollection, notification);
      await fetchNotifications();
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  };

  /**
   * Mark a notification as read.
   * @param {string} id - The ID of the notification to mark as read.
   */
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
    // Fetch notifications when the component mounts.
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

// Custom hook for accessing the notification context.
export const useNotifications = (): INotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
