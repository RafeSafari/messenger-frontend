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
}
