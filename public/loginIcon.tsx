import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const LoginIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200z"></path>
  </svg>
);
