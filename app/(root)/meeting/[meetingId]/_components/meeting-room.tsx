"use client";

import { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks
} from "@stream-io/video-react-sdk";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/loader";
import EndCallButton from "./end-call-button";

import { cn } from "@/lib/utils";

type CallLayout = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayout>("speaker-left");
    const [showParticipants, setShowParticipants] = useState(false);
    const searchParams = useSearchParams();
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
    const router = useRouter();

    if (callingState !== CallingState.JOINED) {
        return <Loader />
    }

    const isPersonalRoom = !!searchParams.get("personal");

    const CallLayout = () => {
        switch (layout) {
            case "grid":
                return <PaginatedGridLayout />
            case "speaker-right":
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={cn(
                    "h-[calc(100vh-86px)] hidden ml-2",
                    showParticipants && "show-block"
                )}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className="fixed bottom-3 md:bottom-7 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls onLeave={() => router.push("/")} />

                <DropdownMenu>
                    <div className="flex items-center">
                       <DropdownMenuTrigger className="cursor-pointer rounded-3xl bg-[#19232d] hover:bg-[#4c535b] px-4 py-2.5">
                           <LayoutList
                              className="text-gray-200"
                              size={20}
                           />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent
                      className="border-dark-1 bg-dark-1 text-white p-2"
                      side="top"
                    >
                        {["Grid", "Speaker left", "Speaker right"].map((item, i) => (
                            <div
                              key={i}
                            >
                                <DropdownMenuItem
                                  onClick={() => {
                                    setLayout(item.toLowerCase() as CallLayout)
                                  }}
                                  className="cursor-pointer"
                                >
                                    {item}
                                </DropdownMenuItem>
                                {/* <DropdownMenuSeparator /> */}
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button
                  onClick={() => setShowParticipants((prev) => !prev)}
                >
                    <div className="cursor-pointer rounded-3xl bg-[#19232d] hover:bg-[#4c535b] px-4 py-2.5">
                        <Users
                          className="text-white"
                          size={20}
                        />
                    </div>
                </button>
                {!isPersonalRoom && (
                    <EndCallButton />
                )}
            </div>
        </section>
    );
}
 
export default MeetingRoom;