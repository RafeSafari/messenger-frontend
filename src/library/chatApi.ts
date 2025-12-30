
import axios, { AxiosError } from 'axios';

type AuthErrorHandler = () => void;
let onUnauthorized: AuthErrorHandler | null = null;

export const setUnauthorizedHandler = (handler: AuthErrorHandler) => {
  onUnauthorized = handler;
};

export const chatApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.fake-cometchat-domain.ir'
      : 'http://localhost:50005',
  withCredentials: true
});

chatApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      !error.config?.skipAuthRedirect
    ) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  }
);

export const postRegister = async (payload: { name: string; email: string; password: string }) =>
  chatApi.post('/auth/register', payload, { skipAuthRedirect: true });

export const postLogin = async (payload: { email: string; password: string }) =>
  chatApi.post("/auth/login", payload, { skipAuthRedirect: true });

export const getLogout = async () => chatApi.get('/auth/logout');

export const getContacts = async () => chatApi.get('/contacts');

export const findUser = async (query: string) => chatApi.get("/contacts/find-user?q=" + encodeURIComponent(query));

export const addContact = async (payload: { uid: string }) => chatApi.post("/contacts", payload);

export const getUser = async (uid: string) =>
  chatApi.get("/contacts/" + encodeURIComponent(uid));

export const postMessage = async (receiverId: string, message: string) =>
  chatApi.post(`/chat/user/${receiverId}`, { message });

export const getChat = async (contactId: string) =>
  chatApi.get(`/chat/user/${contactId}`);

