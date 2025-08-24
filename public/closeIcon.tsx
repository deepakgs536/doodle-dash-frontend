import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-424 284-228q-11 11-28 11t-28-11-11-28 11-28l196-196-196-196q-11-11-11-28t11-28 28-11 28 11l196 196 196-196q11-11 28-11t28 11 11 28-11 28L536-480l196 196q11 11 11 28t-11 28-28 11-28-11z"></path>
  </svg>
);
