// Notification Dropdown
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { useNotifications } from "@/contexts/notification-context";
import { INotification } from "@/@core/interfaces";

export const NotificationsDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { notifications, markAsRead } = useNotifications();

  const colorMapper: Record<string, string> = {
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedNotifications = [...notifications]?.sort((a, b) => {
    if (!a?.read && b?.read) return -1;
    if (a?.read && !b?.read) return 1;
    return 0;
  });

  const getNotificationCount = () => {
    const filteredNotificationsCount = notifications?.filter(
      (notification) => !notification.read
    )?.length;

    return filteredNotificationsCount > 9 ? "9+" : filteredNotificationsCount;
  };

  const handleMarkAsRead = (notification: INotification) => {
    if (!notification?.read && notification?.id) {
      markAsRead(notification?.id);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          {notifications?.some((notification) => !notification.read) && (
            <span className="absolute top-0 right-1 block h-4 w-4 bg-red-500 rounded-full text-white text-[10px]">
              {getNotificationCount()}
            </span>
          )}
        </button>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20"
            style={{ width: "20rem" }}
          >
            <ul className="rounded-lg list-none max-h-96 overflow-y-auto gap-4">
              {sortedNotifications?.length > 0 ? (
                sortedNotifications?.map((notification) => (
                  <li
                    key={notification?.id}
                    className={clsx(
                      "flex items-center justify-between px-4 py-4 border-b hover:bg-gray-200 cursor-pointer transition-colors duration-150",
                      notification?.read
                        ? "bg-white text-gray-500"
                        : "bg-gray-50 text-gray-500"
                    )}
                    onClick={() => {
                      handleMarkAsRead(notification);
                    }}
                  >
                    <div className="flex items-center ">
                      <img
                        className="h-8 w-8 rounded-full object-cover mx-2"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                        alt="avatar"
                      />

                      <div className="flex flex-col justify-between mx-2">
                        <div className="text-sm font-semibold ">
                          {notification?.title}
                        </div>
                        <p className="text-sm">
                          <span className="font-bold">
                            {notification?.body}
                          </span>
                        </p>
                      </div>
                    </div>

                    {!notification?.read && (
                      <span
                        className={clsx(
                          "h-2 w-2 rounded-full text-white",
                          colorMapper?.[notification?.type]
                        )}
                      ></span>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500 p-4">
                  No notifications at the moment!
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
