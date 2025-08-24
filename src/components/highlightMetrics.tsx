import { IconField } from "./iconField";

type HighlightMetricsProps = {
  icon?: React.ReactNode;
  count?: String ;
  label?: String ;
};

export const HighlightMetrics = ({ 
    icon = <IconField baseClass="rounded-full" />, 
    count = "50K" , 
    label = "Active Users" 
}: HighlightMetricsProps) => {

    return (
        <div className="w-fit flex items-center gap-2 md:gap-3">
            {icon}
            <div className="text-[#7b738c] text-center text-[12px] md:text-[14px]">
                <span className="block font-bold text-[18px] md:text-[20px]">{count}+</span>
                <span className="font-normal">{label}</span>
            </div>
        </div>
    )
}