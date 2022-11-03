import { nanoid } from 'nanoid';

const MOCK_USERS = [
  { id: nanoid(), name: 'david' },
  { id: nanoid(), name: 'john' }
];

export const getUsers = async () => {
  return MOCK_USERS;
};
