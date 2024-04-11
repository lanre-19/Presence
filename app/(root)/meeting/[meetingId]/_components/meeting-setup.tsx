"use client";

import { Button } from "@/components/ui/button";
import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

interface MeetingSetupProps {
    setIsSetupComplete: (value: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within StreamCall component");
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }

    }, [isMicCamToggledOn, call?.camera, call?.microphone]);

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-3 text-white">
            <h1 className="text-3xl font-bold">
                Setup
            </h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label
                  className="flex items-center justify-center gap-2 font-medium"
                >
                    <input
                      type="checkbox"
                      checked={isMicCamToggledOn}
                      onChange={(e) => setIsMicCamToggledOn(e.target.checked)}

                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
              onClick={() => {
                call.join();
                setIsSetupComplete(true)
              }}
              className="bg-[#243CFC] hover:bg-[#243dfce6] rounded-md px-4 py-2.5"
              size="lg"
            >
                Join meeting
            </Button>
        </div>
    );
}
 
export default MeetingSetup;