import { BaseResponse } from "serpapi";

export async function sendSerpQuery(query: string): Promise<BaseResponse> {
    return fetch(makeURL(query)).then((response) => response.json())
}

export function parseSerpResponse(response: BaseResponse): string {
    console.log("call parseSerpResponse + " + resopnse);
    return JSON.stringify(response);
}

function makeURL(query: string) {
    const url = new URL("http://localhost:3001/");
    url.searchParams.set("query", query);
    return url.toString();
}