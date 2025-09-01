import toast from "react-hot-toast";

interface ToastOptions {
  message: string;
  type?: "success" | "error" | "info";
  title?: string;
  duration?: number;
}

const showCustomToast = ({
  message,
  type = "info",
  title,
  duration = 2000,
}: ToastOptions) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-error/20 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-error"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-info/20 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-info"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        );
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "ring-success";
      case "error":
        return "ring-error";
      default:
        return "ring-info";
    }
  };

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-custom-enter" : "animate-custom-leave"
        } max-w-md w-full bg-base-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ${getBorderColor()}`}
      >
        <div className="flex-1 w-0 p-2">
          <div className="flex items-center">
            {getIcon()}
            <div className="ml-3 flex-1">
              {title && (
                <p className="text-sm font-medium text-base-content">{title}</p>
              )}
              <p
                className={`${
                  title ? "mt-1" : ""
                } text-sm text-base-content/70`}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    { duration }
  );
};

export { showCustomToast };
