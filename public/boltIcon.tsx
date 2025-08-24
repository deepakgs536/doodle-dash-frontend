import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const BoltIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="m422-232 207-248H469l29-227-185 267h139zM320-80l40-280H160l360-520h80l-40 320h240L400-80zm151-390"></path>
  </svg>
);
