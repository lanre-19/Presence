"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_SECRET_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;

export const tokenProvider = async () => {
    const user = await currentUser();

    // Checks if there is a current signed-in user
    if (!user) {
        throw new Error("Unauthorized");
    }

    // Checks if the is an API key exist
    if (!apiKey) {
        throw new Error("API key was not found");
    }

    // Checks if the is an API secret exist
    if (!apiSecret) {
        throw new Error("API secret was not found");
    }

    // Create a new StreamClient
    const client = new StreamClient(apiKey, apiSecret);

    // Calculate the time of expiry of the token
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    // Calculate the time the token was issued
    const issued = Math.floor(Date.now() / 1000) - 60;

    // Create a new token
    const token = client.createToken(user.id, exp, issued);

    return token;
};