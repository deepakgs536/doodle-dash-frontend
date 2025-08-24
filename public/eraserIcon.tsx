import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const EraserIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M690-240h190v80H610zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160zm296-80 314-322-198-198-442 456 64 64zm-6-240"></path>
  </svg>
);
