"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { redirect } from "next/navigation";

import MeetingSetup from "./_components/meeting-setup";
import MeetingRoom from "./_components/meeting-room";
import Loader from "@/components/loader";

import { useGetCallById } from "@/hooks/use-get-call-by-id";

interface MeetingPageProps {
    params: {
        meetingId: string;
    }
}

const MeetingPage = ({ params }: MeetingPageProps) => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { user, isLoaded } = useUser();
    const { call, isCallLoading } = useGetCallById(params.meetingId);

    if (!user) {
        return redirect("/");
    }

    if (!isLoaded || isCallLoading) {
        return <Loader />
    }

    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    );
}
 
export default MeetingPage;