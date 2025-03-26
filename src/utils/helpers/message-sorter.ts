import { IChatMessage } from "api/type";

export const sortMessage = (messages: IChatMessage[]): IChatMessage[] => {
  return messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

