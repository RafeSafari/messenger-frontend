import { FormControl, Stack, TextField } from "@mui/material";
import ContactList from "./ContactList";
import { useEffect, useMemo, useState } from "react";
import { findUser, getContacts } from "../library/chatApi";
import SearchResult from "./SearchResult";
import { useContactsStore } from "../store/contactsStore";

export default () => {
  const { contacts, setContacts } = useContactsStore();

  useEffect(() => {
    getContacts().then((res) => {
      setContacts(res.data?.contacts || []);
    });
  }, []);

  const [searchValue, setSearchValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 300);
    return () => clearTimeout(id);
  }, [searchValue]);

  const [searchResult, setSearchResult] = useState<Contact[] | undefined>();
  const [searchInputHasFocus, setSearchInputHasFocus] = useState(false);
  const isSearchMode = useMemo(() => {
    return searchInputHasFocus || searchValue;
  }, [searchInputHasFocus, searchValue]);

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
    <Stack height={1} direction="column" gap={1}>
      <Stack direction="column" bgcolor="#F3F6F6" p={1}>
        <FormControl>
          <TextField
            label="Search"
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onFocus={() => setSearchInputHasFocus(true)}
            onBlur={() => setSearchInputHasFocus(false)}
          />
        </FormControl>
      </Stack>

      {isSearchMode ? <>
        <SearchResult users={searchResult} isSearching={isSearching} query={debouncedQuery} />
      </> : (
        <ContactList contacts={contacts} />
      )}
    </Stack>
  );
};