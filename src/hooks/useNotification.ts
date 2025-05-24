import { useState, useCallback } from "react";
import type { NotificationType } from "../components/Notification";

interface NotificationState {
  type: NotificationType;
  message: string;
  isVisible: boolean;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    type: "success",
    message: "",
    isVisible: false,
  });
  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      setNotification({ type, message, isVisible: true });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
