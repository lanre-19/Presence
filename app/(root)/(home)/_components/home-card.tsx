import Image from "next/image";

import { cn } from "@/lib/utils";

interface HomeCardProps {
    className: string;
    imgUrl: string;
    title: string;
    description: string;
    handleClick: () => void;
}

const HomeCard = ({
    className,
    imgUrl,
    title,
    description,
    handleClick
}: HomeCardProps) => {
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] px-4 py-6 rounded-[14px] cursor-pointer",
        className
      )}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image
          src={imgUrl}
          alt="Meeting"
          width={27}
          height={27}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
            {title}
        </h1>
        <p className="text-lg font-normal">
            {description}
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
