import { addToast } from "@heroui/react";

// Reusable toast function
export const showToast = (type: string, message: string) => {
  
  const isSuccess = type === "success";

  addToast({
    hideIcon: true,
    title: <span className={isSuccess ? "text-green-200 font-semibold !text-[16px]" : "text-red-200 font-semibold !text-[16px]"}>{message}</span>,
    classNames: {
      base: `z-300 rounded-xl px-6 py-4 !text-white shadow-md ${
        isSuccess ? "bg-green-500" : "bg-red-500"
      }`,
      closeButton: "opacity-100 absolute right-3 top-1/2 -translate-y-1/2",
    },
    closeIcon: (
      <svg
        fill="none"
        height="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="20"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),
  });
};
