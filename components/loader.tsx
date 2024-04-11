import { Loader2 } from "lucide-react";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 h-screen w-full">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <h2 className="text-gray-200">
                Loading...
            </h2>
        </div>
    );
}
 
export default Loader;