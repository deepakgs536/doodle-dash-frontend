import { ButtonComp } from "@/components/buttonComp";
import { ChipComp } from "@/components/chipComp"
import { Navbar } from "@/components/navbar"
import { cn } from "@heroui/theme";
import { ArtistPaletteIcon, GlobalIcon, GroupIcon, PlayIcon, RewardIcon, RightArrowIcon } from "../../public";
import { IconField } from "@/components/iconField";
import { HighlightMetrics } from "@/components/highlightMetrics";
import { FeaturesCard } from "@/components/featuresCard";
import { Footer } from "@/components/footer";

type ButtonConfig = {
  label: string;
  variant: "solid" | "bordered";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const HomePage = () => {

const buttons : ButtonConfig[] = [
  {
    label: "Start Playing Now",
    variant: "solid",
    iconLeft:  <PlayIcon className="mr-0.5 rotate-90 w-4 h-4 fill-current" />,
    iconRight: <RightArrowIcon className="ml-0.5 w-4 h-4 fill-current" />,
  },
  {
    label: "Create Private Room",
    variant: "bordered",
    iconLeft: <GroupIcon className="mr-0.5 w-4 h-4 fill-current" />,
  },
];

const metrics = [
  {
    icon: <IconField baseClass="rounded-full" />,
    count: "50K",
    label: "Active Users",
  },
  {
    icon: (
      <IconField
        baseClass="rounded-full"
        icon={<PlayIcon className="rotate-90 w-5 h-5 fill-[#7a7591]" />}
      />
    ),
    count: "2M",
    label: "Games Played",
  },
  {
    icon: (
      <IconField
        baseClass="rounded-full"
        icon={<GlobalIcon className="w-5 h-5 fill-[#7a7591]" />}
      />
    ),
    count: "180",
    label: "Countries",
  },
];

const features = [
  {
    icon: <ArtistPaletteIcon className="w-6 h-6 fill-[#24212c] group-hover:scale-120 transition" />,
    bg: "bg-[#fff0f5]",
    title: "Creative Canvas",
    description: "Professional drawing tools with unlimited colors and brushes",
  },
  {
    icon: <GroupIcon className="w-6 h-6 fill-[#24212c] group-hover:scale-120 transition" />,
    bg: "bg-[#edf3ff]",
    title: "Multiplayer Fun",
    description: "Play with friends or join random players worldwide",
  },
  {
    icon: <RewardIcon className="w-6 h-6 fill-[#fbd051] group-hover:scale-120 transition" />,
    bg: "bg-[#fffaed]",
    title: "Competitive Play",
    description: "Climb leaderboards and unlock achievements",
  },
  {
    icon: <ArtistPaletteIcon className="w-6 h-6 fill-[#2bee8c] group-hover:scale-120 transition" />,
    bg: "bg-[#e9fdf3]",
    title: "Real-time Gaming",
    description: "Lightning-fast responses with live drawing synchronization",
  },
];

    const comclass = "mt-0 text-[42px] md:text-[72px] leading-[1] font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent" ;

    return (
        <div className="p-6 bg-[#fbfaff]">
            <Navbar/>
            <div className="flex flex-col justify-center items-center py-10 md:pb-20 md:pt-30">
                <ChipComp/>
                <div className={cn(comclass ,"mt-2 md:mt-4")}>Draw. Guess.</div>
                <div className={cn(comclass, "-mt-4 leading-normal")}>Win Together!</div>
                <div className="md:w-[54%] text-[16px] md:text-[20px] text-[#7b738c] font-normal text-center mt-4">
                    The ultimate multiplayer drawing game where creativity meets competition. 
                    Join millions of players in real-time guessing games that will test your 
                    artistic skills and imagination.
                </div>
                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                {buttons.map(({ label, variant, iconLeft, iconRight }) => (
                    <ButtonComp
                    key={label}
                    label={label}
                    variant={variant}
                    size="lg"
                    mainClass="rounded-xl text-[14px] md:text-[18px] px-2 md:px-4 w-full md:w-fit"
                    onClick={() => {}}
                    startContent={iconLeft}
                    endContent={iconRight}
                    />
                ))}
                </div>

                {/* Metrics */}
                <div
                    className="flex flex-wrap gap-4 md:gap-6 items-center justify-center mt-6 md:mt-10">
                    {metrics.map(({ icon, count, label }) => (
                        <HighlightMetrics key={label} icon={icon} count={count} label={label} />
                    ))}
                    </div>

            </div>
            <div className="flex flex-col justify-center items-center py-10 md:py-20">
                <div className="text-[#24212c] font-bold text-[36px]">
                    Why Players Love DoodleDash
                </div>
                <div className="mt-2 w-[52%] text-center text-[#7b738c] font-normal text-[20px]">
                    Experience the most engaging drawing game with features designed for 
                    maximum fun and creativity.
                </div>
                <div
                    className="
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                        gap-6 mt-15"
                    >
                        {features.map(({ icon, bg, title, description }) => (
                            <div className="flex">
                            <FeaturesCard
                                key={title}
                                icon={<IconField icon={icon} baseClass={`rounded-md ${bg}`} />}
                                title={title}
                                description={description}
                            />
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
            
        </div>
    )
}