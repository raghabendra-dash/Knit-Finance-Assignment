export interface StoredUser {
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = "users";

export const getUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch (e) {
    console.error("Failed to parse users from localStorage", e);
    return [];
  }
};

export const findUserByEmail = (email: string): StoredUser | undefined => {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const saveUser = (user: StoredUser) => {
  const users = getUsers();
  users.push(user);
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save user to localStorage", e);
  }
};
