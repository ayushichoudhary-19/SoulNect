import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ userId });
    }
  }, []);

  const login = (userId) => {
    localStorage.setItem('userId', userId);
    setUser({ userId });
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
