import { Spinner } from "@heroui/react";

type LoadingOverlayProps = {
  show: boolean;
};

export const LoadingOverlay = ({ show }: LoadingOverlayProps) => {
  if (!show) return null; // don't render if false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="rounded-lg p-8 flex flex-col items-center space-y-4">
        {/* Spinning loader */}
        <Spinner classNames={{label: "text-foreground mt-4"}} variant="gradient" />

        {/* Loading text */}
        <p className="text-gray-700 font-medium">Loading...</p>
        <p className="text-gray-500 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
};
