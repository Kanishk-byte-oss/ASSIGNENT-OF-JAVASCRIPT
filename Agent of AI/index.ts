// Load environment variables
import "dotenv/config";

// Import required libraries
import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearch } from "@langchain/tavily";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

// Create Search Tool
const searchTool = new TavilySearch({
  maxResults: 2, // number of search results
});

// Create Wikipedia Tool
const wikiTool = new WikipediaQueryRun({
  topKResults: 2,
});

// Create LLM Model (using OpenRouter)
const llm = new ChatOpenAI({
  model: "google/gemini-2.0-flash-001",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  },
});

// Create Agent with tools
const agent = createAgent({
  model: llm,
  tools: [searchTool, wikiTool],
});

// Main function
async function run() {
  try {
    const userQuery = "History of Mumbai";

    const response = await agent.invoke({
      messages: userQuery,
    });

    console.log("Answer:\n");
    console.log(response.messages.at(-1)?.content);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();