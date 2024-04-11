"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ReactDatePicker from "react-datepicker";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import HomeCard from "@/app/(root)/(home)/_components/home-card";
import MeetingModal from "./modals/meeting-modal";

const MeetingTypeList = () => {
    const [meeting, setMeeting] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantmeeting" | undefined>();
    const [value, setValue] = useState({
      dateTime: new Date(),
      description: "",
      link: ""
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const { toast } = useToast();

    // Function to create a meeting
    const createMeeting = async () => {
      // Check if a user and client exists
      if (!user || !client) return;

      try {
        if (!value.dateTime) {
          toast({
            title: "Uh oh, unable to create meeting",
            description: "Please select a date and time."
          });
          return;
        }

        const id = crypto.randomUUID();
        const call = client.call("default", id);

        if (!call) {
          throw new Error("Failed to create a call");
        }

        const startsAt = value.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = value.description || "Instant Meeting";
        
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description
            }
          }
        });

        setCallDetails(call);

        if (!value.description) {
          router.push(`/meeting/${call.id}`);
        }

        toast({
          title: "You have created a meeting",
          description: "A new meeting has been created successfully.",
          variant: "default"
        });

      } catch (error) {
        console.log("Failed to create a meeting");
        toast({
          title: "Uh oh, unable to create meeting",
          description: "Something went wrong while trying to create meeting.",
          variant: "destructive"
        });
      }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${callDetails?.id}`;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <HomeCard
              className="bg-[#f72585]"
              imgUrl="/icons/add-meeting.svg"
              title="New Meeting"
              description="Start an instant meeting"
              handleClick={() => setMeeting("isInstantmeeting")}
            />
            <HomeCard
              className="bg-[#38a3a5]"
              imgUrl="/icons/join-meeting.svg"
              title="Join Meeting"
              description="via invitation link"
              handleClick={() => setMeeting("isJoiningMeeting")}
            />
            <HomeCard
              className="bg-[#003566]"
              imgUrl="/icons/schedule.svg"
              title="Schedule Meeting"
              description="Plan your meeting"
              handleClick={() => setMeeting("isScheduleMeeting")}
            />
            <HomeCard
              className="bg-[#c1121f]"
              imgUrl="/icons/recordings.svg"
              title="View Recordings"
              description="See your recordings"
              handleClick={() => router.push("/recordings")}
            />
            {!callDetails ? (
              <MeetingModal
                isOpen={meeting === "isScheduleMeeting"}
                onClose={() => setMeeting(undefined)}
                title="Schedule a meeting"
                handleClick={createMeeting}
              >
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-normal leading-[22px] text-sky-2">
                    Add a description
                  </label>
                  <Textarea
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValue({ ...value, description: e.target.value })}
                  />
                </div>
                <div className="flex flex-col w-full gap-2.5">
                  <label className="text-base font-normal leading-[22px] text-sky-2">
                    Choose a date and time it will hold
                  </label>
                  <ReactDatePicker
                    className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                    selected={value.dateTime}
                    onChange={(date) => setValue({ ...value, dateTime: date! })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
              </MeetingModal>
            ) : (
              <MeetingModal
                isOpen={meeting === "isScheduleMeeting"}
                onClose={() => setMeeting(undefined)}
                title="Meeting Created"
                className="text-center"
                buttonText="Copy meeting link"
                handleClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  toast({
                    title: "Link copied to clipboard",
                    variant: "default"
                  });
                }}
                imgUrl="/icons/checked.svg"
                buttonIcon="/icons/copy.svg"
              />
            )}
            <MeetingModal
              isOpen={meeting === "isInstantmeeting"}
              onClose={() => setMeeting(undefined)}
              title="Start a meeting"
              className="text-center"
              buttonText="Start meeting"
              handleClick={createMeeting}
            />
            <MeetingModal
              isOpen={meeting === "isJoiningMeeting"}
              onClose={() => setMeeting(undefined)}
              title="Enter the meeting link"
              className="text-center"
              buttonText="Join meeting"
              handleClick={() => router.push(value.link)}
            >
              <Input
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Type the meeting link"
                onChange={(e) => setValue({ ...value, link: e.target.value })}
              />
            </MeetingModal>
        </section>
    );
}
 
export default MeetingTypeList;