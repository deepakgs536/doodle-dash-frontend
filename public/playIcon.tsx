import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PlayIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M181.23-180q-21.07 0-31.54-18.58-10.46-18.58 1-36.65l298.77-478.08q10.85-17.07 30.54-17.07t30.54 17.07l298.77 478.08q11.46 18.07 1 36.65Q799.84-180 778.77-180zM224-240h512L480-650zm256-205"></path>
  </svg>
);
