import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";

// Ensure you import the correct type
interface ChatCompletionRequestMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    // Retrieve user by ID stored in JWT data
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }

    // Construct chat messages from user data
    const chats: ChatCompletionRequestMessage[] = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));

    // Add the new user message
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Configure OpenAI client
    const openai = configureOpenAI();

    // Request completion from OpenAI
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // Save the response and update the user's chat history
    const botMessage = chatResponse.choices[0].message;
    user.chats.push(botMessage);

    await user.save();

    // Return the updated chat history
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error generating chat completion:", error);

    // Check for specific error types if needed and respond accordingly
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

