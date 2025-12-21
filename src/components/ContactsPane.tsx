import { FormControl, IconButton, Stack, TextField, Typography } from "@mui/material";
import ContactList from "./ContactList";
import { useEffect, useMemo, useState } from "react";
import { findUser, getContacts } from "../library/chatApi";
import SearchResult from "./SearchResult";
import { useContactsStore } from "../store/contactsStore";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import OnlineDot from "./OnlineDot";
import { useSearchStore } from "../store/searchStore";
import { socket } from "../socket";

export default () => {
  const { contacts, setContacts } = useContactsStore();
  const { user } = useAuthStore();

  const reloadContacts = () => {
    getContacts().then((res) => {
      setContacts(res.data?.contacts || []);
    });
  };

  useEffect(reloadContacts, []);

  useEffect(() => {
    socket.emit("register", user?.uid);

    socket.on("new-contact", (uid: string) => {
      reloadContacts();
    });

    return () => {
      socket.off("new-contact");
    };
  }, []);

  const { query, setQuery } = useSearchStore();

  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  const [searchResult, setSearchResult] = useState<Contact[] | undefined>();
  const [searchInputHasFocus, setSearchInputHasFocus] = useState(false);
  const isSearchMode = useMemo(() => {
    return searchInputHasFocus || query;
  }, [searchInputHasFocus, query]);

  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResult(undefined);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      findUser(debouncedQuery)
        .then((res) =>
          setSearchResult(
            (res.data?.users || []).map((user: Contact) => {
              // search for a match in contacts and return it instead of user
              const contact = contacts?.find((contact) => user.uid === contact.uid);
              return contact || user;
            })
          )
        )
        .finally(() => setIsSearching(false));
    }
  }, [debouncedQuery]);

  return (
    <Stack height={1} direction="column">
      <Stack direction="column" gap={1} flex={1}>
        <Stack
          p={1}
          borderBottom="1px solid"
          borderColor="primary.lighter"
          bgcolor="primary.lightest"
          minHeight={58}
          justifyContent="center"
        >
          <FormControl>
            <TextField
              label="Search"
              type="search"
              size="small"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchInputHasFocus(true)}
              onBlur={() => setSearchInputHasFocus(false)}
            />
          </FormControl>
        </Stack>

        {isSearchMode ? (
          <>
            <SearchResult
              users={searchResult}
              isSearching={isSearching}
              query={debouncedQuery}
            />
          </>
        ) : (
          <ContactList contacts={contacts} />
        )}
      </Stack>

      <Stack
        direction="row"
        gap={1}
        p={1}
        flex={0}
        alignItems="center"
        justifyContent="space-between"
        borderTop="1px solid"
        borderColor="primary.lighter"
        bgcolor="primary.lightest"
        minHeight={57}
      >
        <Stack direction="row" gap={1} alignItems="center">
          <OnlineDot />
          <Typography variant="body2" color="text.secondary">
            {user?.name}
          </Typography>
        </Stack>
        <IconButton size="small" color="error" component={Link} to="/logout">
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
};