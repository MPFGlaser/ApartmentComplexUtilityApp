import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

type UserContextType = {
  user: User | null;
  userLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  userLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}, // This is a placeholder, the real function will be provided by the Provider
});

export function useUser() {
  const { user, userLoading, setUser } = useContext(UserContext);
  return { user, userLoading, setUser };
}
