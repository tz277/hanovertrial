"use client"

import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { sendChatGptQuery, parseChatGptResult } from "./chatgpt";
import { parseSerpResponse, sendSerpQuery } from "./serp";

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

export function Main() {
  const [inputState, setInputState] = useState("");
  const [query, setQuery] = useState("")

  const { data } = useQuery({ queryKey: ['main', query], queryFn: () => sendQuery(query) })

  return (
    <div style={{
      justifyContent: "center",
      width: "300px",
      height: "200px",
    }}>
      <h1>Timmy AI</h1>
      <p>Powered by SerpAPI and ChatGPT</p>

      <br />

      <h6>Please enter a query: </h6>
      <br />
      <input
        type="text"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
        style={{ backgroundColor: "#333" }}
      />

      <button onClick={() => setQuery(inputState)}> Submit Query</button>

      <br />
      <br />

      {data && <RenderResult queryResult={data} />}

    </div>
  );
}

function RenderResult({ queryResult }: { queryResult: QueryResult }) {
  return <>{JSON.stringify(queryResult)}</>
}


type QueryResult = {
  serpApiResult: string,
  chatGptResult: string,
}


async function sendQuery(query: string): Promise<QueryResult | null> {
  console.log("CALL sendQuery + " + query)
  if (query === "") {
    return null;
  }

  const chatGptRawResult = await sendChatGptQuery(query);
  const chatGptResult = parseChatGptResult(chatGptRawResult);

  const serpResponse = await sendSerpQuery(query);
  const serpApiResult = parseSerpResponse(serpResponse);

  return {
    serpApiResult,
    chatGptResult,
  }
}

