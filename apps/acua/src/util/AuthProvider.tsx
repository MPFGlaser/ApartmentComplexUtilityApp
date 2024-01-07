import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { auth } from './firebase';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

type AuthContextType = {
  currentUser: User | null | undefined;
  getUser: () => User | null | undefined;
  login: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  refreshIdToken: () => Promise<string>;
  getIdToken: () => Promise<string>;
  userHasClaim: (claim: string[]) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const login = useCallback((email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(() => {
    return firebaseSignOut(auth);
  }, []);

  const signUp = useCallback((email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const getUser = useCallback(() => {
    return currentUser;
  }, [currentUser]);

  const refreshIdToken = useCallback(() => {
    if (!currentUser) return Promise.reject(new Error('No user signed in'));
    return currentUser?.getIdToken(true);
  }, [currentUser]);

  const getIdToken = useCallback(() => {
    if (!currentUser) return Promise.reject(new Error('No user signed in'));
    return currentUser?.getIdToken();
  }, [currentUser]);

  const userHasClaim = useCallback(
    (claims: string[]) => {
      if (!currentUser) return Promise.reject(new Error('No user signed in'));
      return currentUser.getIdTokenResult().then((decodedToken) => {
        const tokenClaims =
          // Firebase tokens really have a property called 'claims'
          // that contain the user data in a token, including the custom 'claims' array...
          (decodedToken['claims']['claims'] as string[]) || [];
        return claims.some((claim) => tokenClaims.includes(claim));
      });
    },
    [currentUser]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      getUser,
      login,
      signOut,
      signUp,
      refreshIdToken,
      getIdToken,
      userHasClaim,
    }),
    [
      currentUser,
      getUser,
      login,
      signOut,
      signUp,
      refreshIdToken,
      getIdToken,
      userHasClaim,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
