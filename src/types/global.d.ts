export {};

declare global {
  type Contact = {
    uid: string;
    name: string;
    avatar?: string;
    link?: string;
    role?: string;
    status?: string;
    statusMessage?: string;
    email?: string;
    tags?: string[];
    conversationId?: string;
    [key: string]: unknown;
  };
  
  type Message = {
    id: string;
    conversationId: string;
    sender: string;
    receiver: string;
    text: string;
    sentAt: number;
    type: string;
    category: string;
  };
  
  type ServerMessage = {
    category: string;
    conversationId: string;
    data: {
      text?: string;
      [key: string]: unknown;
    };
    id: string;
    receiver: string;
    receiverType: string;
    sender: string;
    sentAt: number;
    type: string;
    updatedAt: number;
  };

}
