import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type IUser } from "../types/auth.types";
import { get_profile } from "../api/auth.api";

interface IContext {
  user: null | IUser;
  setUser: Dispatch<SetStateAction<null>>;
  isLoading: boolean;

  logout: () => void;
}

const initial_value = {
  user: null,
  setUser: () => {},
  isLoading: true,
  token: null,
  logout: () => {},
};

const AuthContext = createContext<IContext>(initial_value);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await get_profile();
        console.log(data);
        setUser(data.data);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setisLoading(false);
      }
    }

    fetchUser();
  }, []);

  const logout = (cb = () => {}) => {
    localStorage.removeItem("user");

    setUser(null);
    cb();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => {
  if (!AuthContext) {
    console.log("useAuth hook must be used inside auth provider");
  }

  return useContext(AuthContext);
};

export default AuthProvider;
