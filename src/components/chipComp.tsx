import { StarIcon } from "../../public";

export const ChipComp = () => {
    return (
        <div className="bg-[#eae6fe] border-2 border-[#e2c9fe] shadow-none md:py-[2px] pb-[2px] md:pb-[4px] px-[8px] md:px-[12px] text-[10px] md:text-[12px] leading-4 font-semibold text-[#a651fb] w-fit rounded-full flex gap-1 md:gap-2 items-center justify-center">
            <StarIcon className="fill-[#a651fb] w-4 h-4 md:w-5 md:h-5" />
            Most Popular Drawing Game 2025
        </div>
    )
}