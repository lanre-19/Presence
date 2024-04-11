import MeetingTypeList from "@/components/meeting-type-list";
import { Bell } from "lucide-react";

const Home = () => {
    const now = new Date();

    const time = now.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
    const date = (new Intl.DateTimeFormat("en-NG", { dateStyle: "full" })).format(now);

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
                <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="flex items-center justify-center glassmorphism max-w-[280px] rounded-full py-1.5 text-center text-base gap-x-1 font-normal">
                        <Bell className="w-5 h-5" />
                        Upcoming meeting at 11:50 PM
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">
                            {time}
                        </h1>
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                            {date}
                        </p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    );
}
 
export default Home;