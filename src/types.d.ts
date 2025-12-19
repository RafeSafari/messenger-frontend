export {};

declare global {
  // interface ContactMetadata {
  //   email?: string;
  //   phone?: string;
  //   [key: string]: unknown;
  // }

  // interface Contact {
  //   uid: string;
  //   name: string;
  //   avatar?: string;
  //   link?: string;
  //   role?: string;
  //   status?: string;
  //   statusMessage?: string;
  //   metadata?: ContactMetadata;
  //   tags?: string[];
  // }

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
