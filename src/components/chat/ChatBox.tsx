import { Button, Stack, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore";
import { addContact, getChat, getUser } from "../../library/chatApi";
import { toast } from "react-toastify";
import { useContactsStore } from "../../store/contactsStore";
import { useEffect } from "react";
import MessageItem from "./MessageItem";
import { useSearchStore } from "../../store/searchStore";

const ChatBox = () => {
  const { contact, setContact, messages, setMessages } = useChatStore();
  const { addSingleContact } = useContactsStore();
  const { reset: clearSearch } = useSearchStore();

  useEffect(() => {
    if (contact?.uid) {
      getChat(contact?.uid)
        .then((res) => {
          setMessages(res.data?.res || []);
        })
        .catch((err) => console.error(err));
    }
  }, [contact?.uid]);

  if (!contact) return null;

  const addToContacts = () => {
    addContact({ uids: [contact.uid] }).then(res => {
      if (res.data?.res?.[contact.uid]?.success) {
        getUser(contact.uid).then(res => {
          if (res.data) {
            addSingleContact(res.data?.user?.data);
            setContact(res.data?.user?.data);
            clearSearch();
          }
        });
      }

    }).catch(err => {
      console.error(err);
      toast.error('Failed to add this contact');
    });
  }

  if (!contact.conversationId) return (
    <Stack height={1} alignItems="center" justifyContent="center">
      <Stack gap={1.5} direction="column" bgcolor="primary.lighter" alignItems="center" borderRadius={2} px={4} py={2}>
        <Typography variant="body2" color="primary.dark">This user is not in your contact list</Typography>
        <Button variant="contained" color="primary" onClick={addToContacts}>Add "{contact.name}" to contacts</Button>
        <Typography variant="body2" color="primary.dark">to start a conversation</Typography>
      </Stack>
    </Stack>
  )

  return (
    <Stack height={1} p={1} direction="column" gap={1}>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </Stack>
  );
};

export default ChatBox;