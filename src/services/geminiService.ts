import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function suggestNextSteps(
  decision: string,
  goal: string
): Promise<string[]> {
  const model = "gemini-3.1-pro-preview";

  let prompt = `Based on the decision '${decision}' and the goal '${goal}', please suggest 2-3 potentially related future decisions or next steps that might logically follow.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert decision-making consultant. Provide 2-3 concise, actionable next steps or future decisions.",
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "A short, actionable next step or decision."
          }
        }
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error suggesting next steps:", error);
    return [];
  }
}

export async function analyzeDecision(
  decision: string,
  goal: string,
  analysisType: 'pros-cons' | 'comparison' | 'swot'
): Promise<string> {
  const model = "gemini-3.1-pro-preview"; // Using pro for complex text analysis

  let systemInstruction = "You are an expert decision-making consultant. ";
  
  if (analysisType === 'pros-cons') {
    systemInstruction += "Analyze the user's decision and provide a detailed Pros and Cons list. Conclude with a helpful insight or recommendation.";
  } else if (analysisType === 'comparison') {
    systemInstruction += "Analyze the user's decision and provide a comparison table evaluating the different options or alternatives implied (if none are explicit, assume 'doing it' vs 'not doing it', or request clarifying criteria in your analysis). Format it beautifully in Markdown. Conclude with a helpful recommendation.";
  } else if (analysisType === 'swot') {
    systemInstruction += "Analyze the user's decision by providing a detailed SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis. Use Markdown headings and bullet points. Connect it to the user's goal if provided. Conclude with a strategic recommendation.";
  }

  let prompt = `Decision to make:\n${decision}\n`;
  if (goal) {
    prompt += `\nDesired Outcome/Goal:\n${goal}\n`;
    systemInstruction += " Crucially, tailor your entire analysis toward helping the user achieve their specific 'Desired Outcome/Goal'.";
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Error analyzing decision:", error);
    throw new Error("Failed to generate analysis. Please check your API key or try again later.");
  }
}
