// Import required modules
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "@langchain/ollama";

// Main function
async function run() {
  try {
    // 1️⃣ Load PDF
    const loader = new PDFLoader("ATM Simulation System.pdf");
    const docs = await loader.load();

    console.log("PDF Loaded ");

    // 2️⃣ Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    console.log("Text Split into Chunks ");
    console.log("Total Chunks:", splitDocs.length);

    // 3️⃣ Create Embedding Model
    const embeddingModel = new OllamaEmbeddings({
      model: "nomic-embed-text", // example embedding model
    });

    // 4️⃣ Generate embeddings for first chunk (example)
    const embedding = await embeddingModel.embedQuery(
      splitDocs[0].pageContent
    );

    console.log("Embedding Created ");
    console.log("Embedding Vector Length:", embedding.length);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();