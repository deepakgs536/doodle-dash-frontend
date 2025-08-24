import { GroupIcon } from "../../public";
import { cn } from "@heroui/theme"; // optional, for safe class merging

type IconFieldProps = {
  icon?: React.ReactNode;
  baseClass?: string;
};

export const IconField = ({ icon = <GroupIcon className="w-5 h-5 fill-[#7a7591]" />, baseClass = "" }: IconFieldProps) => {
  return (
    <div className={cn(`bg-[#f2e8ff] py-[2px] p-2 w-fit ${baseClass}`)}>
      {icon}
    </div>
  );
};
