import OpenAI from "openai";
import { OPENAI_API_KEY } from "./apikeys";

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export function sendChatGptQuery(query: string): Promise<OpenAI.ChatCompletion> {
    return openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            { "role": "user", "content": query },
        ],
    });
}

export function parseChatGptResult(chatCompletion: OpenAI.ChatCompletion): string {
    return chatCompletion.choices[0].message.content || "(null result)"
}