import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const RewardIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-520q33 0 56.5-23.5T560-600t-23.5-56.5T480-680t-56.5 23.5T400-600t23.5 56.5T480-520M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80zm0-408v-152h-80v40q0 38 22 68.5t58 43.5m200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35m200-128q36-13 58-43.5t22-68.5v-40h-80zm-200-52"></path>
  </svg>
);
