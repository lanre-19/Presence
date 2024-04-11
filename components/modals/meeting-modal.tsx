import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttonText?: string;
    buttonIcon?: string;
    handleClick: () => void;
    children?: React.ReactNode;
    imgUrl?: string;
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    buttonText,
    buttonIcon,
    handleClick,
    children,
    imgUrl
}: MeetingModalProps) => {
    return (
        <Dialog
          open={isOpen}
          onOpenChange={onClose}
        >
            <DialogContent className="flex flex-col w-full max-w-[520px] gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                    {imgUrl && (
                        <div className="flex justify-center">
                            <Image
                              src={imgUrl}
                              alt="Image"
                              width={72}
                              height={72}
                            />
                        </div>
                    )}
                    <h1 className={cn(
                        "text-3xl font-bold leading-[42px]",
                        className
                    )}>
                        {title}
                    </h1>
                    {children}
                    <Button
                      onClick={handleClick}
                      className="bg-[#243CFC] hover:bg-[#243dfcc7] focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        {buttonIcon && (
                            <Image
                              src={buttonIcon}
                              alt="Button Icon"
                              width={13}
                              height={13}
                            />
                        )}{" "}&nbsp;
                        {buttonText || "Schedule meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
 
export default MeetingModal;