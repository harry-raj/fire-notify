// Notification
import { useNotifications } from "@/contexts/notification-context";

export const NotificationButtons = () => {
  const { addNotification } = useNotifications();

  /**
   * Sends a notification with the given title and body.
   *
   * @param {string} title - The title of the notification.
   * @param {string} body - The body of the notification.
   * @return {Promise<void>} A promise that resolves when the notification is sent.
   */
  const sendNotification = async (
    title: string,
    body: string,
    type: string
  ) => {
    await addNotification({
      title: `${title} Notification`,
      body,
      url: "https://example.com",
      read: false,
      type,
    });
  };

  return (
    <div className="max-w-7xl mx-auto flex space-x-4">
      <button
        type="button"
        onClick={() =>
          sendNotification("Info", "This is an info notification", "info")
        }
        className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Info
      </button>

      <button
        type="button"
        onClick={() =>
          sendNotification(
            "Warning",
            "This is a warning notification",
            "warning"
          )
        }
        className="inline-flex items-center rounded-md bg-gray-100 px-6 py-2 text-md font-semibold text-dark shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      >
        Warning
      </button>

      <button
        type="button"
        onClick={() =>
          sendNotification("Error", "This is an error notification", "error")
        }
        className="inline-flex items-center rounded-md bg-gray-900 px-6 py-2 text-md font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
      >
        Error
      </button>
    </div>
  );
};
