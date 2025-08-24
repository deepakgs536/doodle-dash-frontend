import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const RightArrowIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M665.08-450H210q-12.77 0-21.38-8.62Q180-467.23 180-480t8.62-21.38Q197.23-510 210-510h455.08L458.31-716.77q-8.92-8.92-8.81-20.88.12-11.96 9.42-21.27 9.31-8.69 21.08-9t21.08 9l253.61 253.61q5.62 5.62 7.92 11.85 2.31 6.23 2.31 13.46t-2.31 13.46q-2.3 6.23-7.92 11.85L501.08-201.08q-8.31 8.31-20.58 8.5t-21.58-8.5q-9.3-9.31-9.3-21.38 0-12.08 9.3-21.39z"></path>
  </svg>
);
