import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { generateChatCompletion } from "@/lib/aiClient";

export const chatRouter = router({
  // ... existing procedures ...

  generateGeminiResponse: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await generateChatCompletion(
          [{ role: "user", content: input.prompt }],
          "GEMINI_PRO"
        );
        return { output: response };
      } catch (error) {
        console.error("Error generating response:", error);
        throw error;
      }
    }),
}); 