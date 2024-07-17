import {OpenAI} from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});




export async function generateImagePrompt(name: string) {
  try {
    const response = await  openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an creative AI assistant capable of generating accurate thumbnail description for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titles ${name}`,
        },
      ],
    });
    const data = await response;
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No choices returned from the API.');
    }
    
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.images.generate({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const data = await response;
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  runtime: "edge",
}
