import { IconField } from "./iconField";

type FeaturesCardProps = {
  icon?: React.ReactNode;
  title?: String ;
  description?: String ;
};

export const FeaturesCard = ({ 
    icon = <IconField baseClass="rounded-full" />, 
    title = "Creative Canvas" , 
    description = "Professional drawing tools with unlimited colors and brushes" 
}: FeaturesCardProps) => {

    return (
        <div className="group hover:scale-110 transition-all duration-200 w-full bg-white border-2 border-[#e3deed] p-6 rounded-xl">
            {icon}
            <div className="mt-2.5 text-[20px] text-[#24212c] font-semibold">
                {title}
            </div>
            <div className="text-[16px] text-[#7b738c] font-normal">
                {description}
            </div>
        </div>
    )
}