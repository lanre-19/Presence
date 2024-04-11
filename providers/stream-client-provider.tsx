"use client";

import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import Loader from "@/components/loader";

import { tokenProvider } from "@/actions/stream.actions";

interface StreamVideoProviderProps {
    children: React.ReactNode;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

const StreamVideoProvider = ({ children }: StreamVideoProviderProps) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Checks if the is a user, and it has loaded
    if (!user || !isLoaded) return;

    // Checks if an API key exist
    if (!apiKey) {
        throw new Error("Stream API key was not found");
    }

    // Create a new StreamVideoClient
    const client = new StreamVideoClient({
        apiKey,
        user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl
        },
        tokenProvider: tokenProvider,
    });

    setVideoClient(client);

  }, [user, isLoaded]);

  if (!videoClient) {
    return <Loader />
  }

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
