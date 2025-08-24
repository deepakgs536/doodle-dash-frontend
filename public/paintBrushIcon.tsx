import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PaintBrushIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35 85 35 35 85q0 66-47 113t-113 47m0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320t-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28zm-190 80"></path>
  </svg>
);
