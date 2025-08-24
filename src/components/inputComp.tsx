import { Input } from "@heroui/input";
import {
  LockIcon,
  MailIcon,
  PersonIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../public";
import React from "react";

type InputCompProps = {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "full";
  type?: "email" | "password" | "name" | string;
  name?: string ;
  isDescription?: boolean ;
};

export const InputComp = ({
  label = "Name",
  onChange = () => {},
  isRequired = false,
  size = "md",
  radius = "md",
  type = "name",
  name = "username" ,
  isDescription = true ,
}: InputCompProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getIcon = (inputType: string) => {
    switch (inputType) {
      case "email":
        return <MailIcon className="w-4 h-4 fill-[#7b738c] mx-0.5" />;
      case "password":
        return <LockIcon className="w-4 h-4 fill-[#7b738c] mx-0.5" />;
      case "username":
        return <PersonIcon className="w-4 h-4 fill-[#7b738c] mx-0.5" />;
      default:
        return <></>;
    }
  };

  const getPlaceholder = (type: string, label: string) => {
  switch (type) {
    case "password":
      return "Enter your password";
    case "email":
      return "Enter your email";
    case "username":
      return "Enter your name";
    default:
      return label;
  }
};

const getDescription = (type: string) => {
  switch (type) {
    case "password":
      return "We'll never share your password with anyone else.";
    case "email":
      return "We'll never share your email with anyone else.";
    default:
      return "Pick a name that sticks with rest of your life"; // no description
  }
};

  return (
    <div>
      <Input
        classNames={{
          base: type === "password" ? "pointer-none" : "" ,
          label: "text-[14px] font-medium leading-[14px] pb-2.5",
          input: [
            "my-2",
            "bg-transparent",
            "text-[#52505a] text-[14px] font-normal",
            "placeholder:text-[#c4c3c9] text-[14px] font-normal",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "bg-white",
            "hover:bg-white",
            "border-2",
            "border-[#e9e4f1]", // default border
            "hover:!border-[#a551fb]", // hover border
            "group-data-[focus=true]:!border-[#a551fb]", // focus border
          ],
        }}
        name={name}
        label={label}
        labelPlacement="outside-top"
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        // value={value}
        placeholder={getPlaceholder(type, label)}
        description={isDescription ? getDescription(type) : ""}
        isRequired={isRequired}
        size={size}
        radius={radius}
        variant="bordered"
        startContent={getIcon(type)}
        endContent={
          type === "password" && (
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <VisibilityIcon className="w-5 h-5 fill-[#7b738c] mx-0.5" />
              ) : (
                <VisibilityOffIcon className="w-5 h-5 fill-[#7b738c] mx-0.5" />
              )}
            </button>
          )
        }
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
