"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useGetCallById } from "@/hooks/use-get-call-by-id";

interface TableProps {
    title: string;
    description: string;
}

const Table = ({
    title,
    description
}: TableProps) => {
    return (
        <div className="flex flex-col items-start gap-2 xl:flex-row">
            <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">{title}:</h1>
            <h1 className="text-sm font-bold max-sm:max-w-[320px] lg:text-xl truncate">{description}</h1>
        </div>
    )
};

const PersonalRoom = () => {
    const { user } = useUser();
    const { toast } = useToast();
    const client = useStreamVideoClient();
    const router = useRouter();

    const meetingId = user?.id;

    const { call } = useGetCallById(meetingId!);

    const meetingLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${meetingId}?personal=true`;

    const startMeeting = async () => {
        if (!client || !user) return;

        if (!call) {
          const newCall = client?.call("default", meetingId!);

          await newCall.getOrCreate({
            data: {
              starts_at: new Date().toISOString()
            }
          });
        }

        router.push(`/meeting/${meetingId}?personal=true`);
        
    };

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <h1 className="text-3xl font-bold">
                Personal Room
            </h1>

            <div className="flex flex-col w-full gap-8 xl:max-w-[900px]">
                <Table
                  title="Topic"
                  description={`${user?.username}'s meeting room`}
                />
                <Table
                  title="Meeting Id"
                  description={meetingId!}
                />
                <Table
                  title="Invite Link"
                  description={meetingLink}
                />
            </div>
            <div className="flex gap-5">
                <Button
                  onClick={startMeeting}
                  className="bg-blue-1 hover:bg-blue-900"
                >
                    Start Meeting
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({
                        title: "Link copied to clipboard",
                        variant: "default"
                    });
                  }}
                  className="bg-dark-3 hover:bg-gray-800"
                >
                    Copy Invitation
                </Button>
            </div>
        </section>
    );
}
 
export default PersonalRoom;