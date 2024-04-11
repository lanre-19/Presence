// @ts-nocheck

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Call, CallRecording } from "@stream-io/video-react-sdk";

import { useToast } from "@/components/ui/use-toast";
import MeetingCard from "./meeting-card";
import Loader from "./loader";

import { useGetCalls } from "@/hooks/use-get-calls";

interface CallListProps {
    type: "ended" | "upcoming" | "recordings";
}

const CallList = ({ type }: CallListProps) => {
    const {
        upcomingCalls,
        endedCalls,
        callRecordings,
        isLoading
    } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const router = useRouter();
    const { toast } = useToast();


    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls;
            case "recordings":
                return recordings;
            case "upcoming":
                return upcomingCalls;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "No Previous Calls";
            case "recordings":
                return "No Recordings";
            case "upcoming":
                return "No Upcoming Calls";
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()));

                const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);

                setRecordings(recordings);

            } catch (error) {
                toast({
                    title: "Uh oh, try again later",
                    variant: "destructive"
                })
            }
        };

        if (type === "recordings") {
            fetchRecordings();
        }

    }, [type, callRecordings]);

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                  key={(meeting as Call).id}
                  icon={type === "ended" ? "/icons/previous.svg" : type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recordings.svg"}
                  date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
                  handleClick={type === "recordings" ? () => router.push(meeting.url) : () => router.push(`/meeting/${meeting.id}`)}
                  link={type === "recordings" ? meeting.url : `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${meeting.id}`}
                  title={(meeting as Call).state?.custom?.description?.substring(0, 23) || meeting?.filename?.substring(0, 20) || "Personal Meeting"}
                  buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
                  buttonText={type === "recordings" ? "Play" : "Start"}
                  isPreviousMeeting={type === "ended"}
                />
            )) : (
                <h1>
                    {noCallsMessage}
                </h1>
            )}
        </div>
    );
}
 
export default CallList;