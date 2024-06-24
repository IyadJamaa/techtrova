import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  generateChatCompletion
} from "../controllers/chat-controllers.ts";

//Protected API
const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, generateChatCompletion.sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, generateChatCompletion.deleteChats);

export default chatRoutes;
