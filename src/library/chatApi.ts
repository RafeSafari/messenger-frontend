import axios from 'axios';
axios.defaults.withCredentials = true;

const CHAT_BASE_URL: string = process.env.NODE_ENV === 'production' ? 'https://fake-cometchat-domain.ir' : 'http://localhost:50005';

// // GET /users
// async listUsers(options: ListUsersOptions = {}): Promise<ApiResponse<CometChatUser[]>> {
//   const res = await this.http.get<ApiResponse<CometChatUser[]>>('/users', {
//     params: options,
//   });
//   return res.data;
// }

export const register = async (payload: { name: string; email: string; password: string }) => {
  const res = await axios.post(CHAT_BASE_URL + '/auth/register', payload);
  return res;
}

export const login = async (payload: { email: string; password: string }) => {
  const res = await axios.post(CHAT_BASE_URL + '/auth/login', payload);
  return res;
}

export const getContacts = async () => {
  const res = await axios.get(CHAT_BASE_URL + '/contacts');
  return res;
}

export const findUser = async (query: string) => {
  const res = await axios.get(CHAT_BASE_URL + '/contacts/find-user?q=' + encodeURIComponent(query));
  return res;
}

export const addContact = async (payload: { uids: string[] }) => {
  const res = await axios.post(CHAT_BASE_URL + '/contacts', payload);
  return res;
}

export const getUser = async (uid: string) => {
  const res = await axios.get(CHAT_BASE_URL + '/contacts/' + encodeURIComponent(uid));
  return res;
}

// // PUT /users/{uid}
// async updateUser(
//   uid: string,
//   payload: UpdateUserRequest,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse<CometChatUser>> {
//   const res = await this.http.put<ApiResponse<CometChatUser>>(
//     `/users/${encodeURIComponent(uid)}`,
//     payload,
//     buildConfig({ onBehalfOf }),
//   );
//   return res.data;
// }

// /**
//  * ==============
//  * MESSAGE APIS
//  * ==============
//  */

// // POST /messages
// async sendMessage(
//   messagePayload: SendMessageRequest,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse<CometChatMessage>> {
//   const res = await this.http.post<ApiResponse<CometChatMessage>>(
//     '/messages',
//     messagePayload,
//     buildConfig({ onBehalfOf }),
//   );
//   return res.data;
// }

// // GET /messages (global list)
// async listMessages(
//   options: ListMessagesOptions = {},
// ): Promise<ApiResponse<CometChatMessage[]>> {
//   const { onBehalfOf, ...params } = options;
//   const res = await this.http.get<ApiResponse<CometChatMessage[]>>(
//     '/messages',
//     buildConfig({ onBehalfOf, params }),
//   );
//   return res.data;
// }

// /**
//  * ===================
//  * USER MESSAGES / CONVERSATIONS
//  * ===================
//  */

// // GET /users/{uid}/messages
// async listUserMessages(
//   uid: string,
//   options: ListUserMessagesOptions = {},
// ): Promise<ApiResponse<CometChatMessage[]>> {
//   const { onBehalfOf, ...params } = options;
//   const res = await this.http.get<ApiResponse<CometChatMessage[]>>(
//     `/users/${encodeURIComponent(uid)}/messages`,
//     buildConfig({ onBehalfOf, params }),
//   );
//   return res.data;
// }

// // GET /users/{uid}/conversation
// async getUserConversation(
//   uid: string,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse<Conversation>> {
//   const res = await this.http.get<ApiResponse<Conversation>>(
//     `/users/${encodeURIComponent(uid)}/conversation`,
//     buildConfig({ onBehalfOf }),
//   );
//   return res.data;
// }

// // POST /users/{uid}/conversation/read
// async markUserConversationRead(
//   uid: string,
//   messageId: string | number,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse> {
//   const body = { messageId };
//   const res = await this.http.post<ApiResponse>(
//     `/users/${encodeURIComponent(uid)}/conversation/read`,
//     body,
//     buildConfig({ onBehalfOf }),
//   );
//   return res.data;
// }

// // DELETE /users/{uid}/conversation/read (optional extra)
// async markUserConversationUnread(
//   uid: string,
//   messageId: string | number,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse> {
//   const body = { messageId };
//   const res = await this.http.delete<ApiResponse>(
//     `/users/${encodeURIComponent(uid)}/conversation/read`,
//     {
//       ...buildConfig({ onBehalfOf }),
//       data: body, // axios uses `data` for DELETE body
//     },
//   );
//   return res.data;
// }

// /**
//  * ===================
//  * GROUP CONVERSATION HELPERS (OPTIONAL)
//  * ===================
//  */

// // POST /groups/{guid}/conversation/read
// async markGroupConversationRead(
//   guid: string,
//   messageId: string | number,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse> {
//   const body = { messageId };
//   const res = await this.http.post<ApiResponse>(
//     `/groups/${encodeURIComponent(guid)}/conversation/read`,
//     body,
//     buildConfig({ onBehalfOf }),
//   );
//   return res.data;
// }

// // DELETE /groups/{guid}/conversation/read
// async markGroupConversationUnread(
//   guid: string,
//   messageId: string | number,
//   { onBehalfOf }: { onBehalfOf?: string } = {},
// ): Promise<ApiResponse> {
//   const body = { messageId };
//   const res = await this.http.delete<ApiResponse>(
//     `/groups/${encodeURIComponent(guid)}/conversation/read`,
//     {
//       ...buildConfig({ onBehalfOf }),
//       data: body,
//     },
//   );
//   return res.data;
// }
