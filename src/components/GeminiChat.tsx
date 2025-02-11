"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";

export function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");

  const generateMutation = trpc.chat.generateGeminiResponse.useMutation({
    onSuccess: (data) => {
      setResponseText(data.output);
    },
    onError: (error) => {
      console.error("Error:", error);
      setResponseText("Error: An unexpected error occurred.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generateMutation.mutate({ prompt });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Gemini-Powered Chatbot</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="border p-2 w-full max-w-lg rounded-md"
          rows={4}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={generateMutation.isLoading}
        >
          {generateMutation.isLoading ? "Generating..." : "Generate"}
        </button>
      </form>
      {responseText && (
        <div className="max-w-lg p-4 border rounded-md bg-gray-50">
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
} 