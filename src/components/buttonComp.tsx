import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";

type ButtonCompProps = {
  mainClass?: string;
  label: string;
  variant?: "solid" | "bordered";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  value?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  size?: "sm" | "md" | "lg" ; 
  isIconOnly?: boolean ;
};

export const  ButtonComp = ({
  mainClass = "" ,
  label,
  variant = "bordered",
  onClick,
  name,
  value,
  startContent,
  endContent,
  size = "md" ,
  isIconOnly = false ,
}: ButtonCompProps) => {
  const isSolid = variant === "solid";

  const baseClasses =
    "font-[18px] flex items-center font-medium rounded-lg transition-all duration-100";

  const solidClasses =
    "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white";

  const borderedClasses =
    "bg-transparent text-[#24212c] border-2 border-[#e9e4f1] hover:bg-[#fa8938] hover:border-[#fa8938] hover:text-white";

  return (
    <Button
      id="unique"
      className={cn(baseClasses, (isSolid ? (`${solidClasses} rounded-md`) : borderedClasses) , mainClass)}
      onClickCapture={onClick}
      name={name}
      value={value}
      size={size}
      isDisabled={false}
      variant={variant}
      isLoading={false}
      startContent={
        startContent ?? <></>
      }
      endContent={
        endContent ?? <></>
      }
      isIconOnly={isIconOnly}
    >
      {label}
    </Button>
  );
};
