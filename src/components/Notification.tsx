import React from "react";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";

export type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: "bg-green-50",
    error: "bg-red-50",
    info: "bg-blue-50",
    warning: "bg-yellow-50",
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800",
  };

  const icons = {
    success: <MdCheckCircle className="h-5 w-5 text-green-400" />,
    error: <MdError className="h-5 w-5 text-red-400" />,
    info: <MdInfo className="h-5 w-5 text-blue-400" />,
    warning: <MdWarning className="h-5 w-5 text-yellow-400" />,
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-lg p-4 ${
        bgColors[type]
      } shadow-lg transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center space-x-2">
        {icons[type]}
        <span className={`${textColors[type]} text-sm font-medium`}>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Notification;
