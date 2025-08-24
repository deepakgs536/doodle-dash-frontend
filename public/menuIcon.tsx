import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M160-240q-17 0-28.5-11.5T120-280t11.5-28.5T160-320h640q17 0 28.5 11.5T840-280t-11.5 28.5T800-240zm0-200q-17 0-28.5-11.5T120-480t11.5-28.5T160-520h640q17 0 28.5 11.5T840-480t-11.5 28.5T800-440zm0-200q-17 0-28.5-11.5T120-680t11.5-28.5T160-720h640q17 0 28.5 11.5T840-680t-11.5 28.5T800-640z"></path>
  </svg>
);