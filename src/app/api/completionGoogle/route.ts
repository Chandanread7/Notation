// import { NextResponse } from "next/server";
// import { StreamingTextResponse, streamObject } from "ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// export async function POST(req: Request) {
//   // extract the prompt from the body
//   const { prompt } = await req.json();
//   const prompt1= `I am writing a piece of text in a notion text editor app.
//         Help me complete my train of thought here: ${prompt} 
//         keep the tone of the text consistent with the rest of the text.
//         keep the response relevant and about 100 words .`
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//   const result = await model.generateContentStream(prompt1);
//   const response = result.response;
//   const text = response.text();
//   return new StreamingTextResponse(text);
  
// }
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  const prompt1= `I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here: ${prompt} 
        keep the tone of the text consistent with the rest of the text.
        keep the response relevant and about 100 words continue generating after the prompt.`

  const geminiStream = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream(prompt1);

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}



