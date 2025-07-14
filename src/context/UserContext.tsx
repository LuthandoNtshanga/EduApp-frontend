import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// User type definition
export type User = {
  name: string;
  email: string;
  role: 'user' | 'admin' | '';
};

// State and action types
interface UserState {
  user: User | null;
}

type UserAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> };

// Initial state
const initialState: UserState = {
  user: null,
};

// Reducer function to handle actions
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    case 'UPDATE_PROFILE':
      return {
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
}

// Context value type
interface UserContextType extends UserState {
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Action handlers
  const login = (user: User) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const updateProfile = (updates: Partial<User>) =>
    dispatch({ type: 'UPDATE_PROFILE', payload: updates });

  return (
    <UserContext.Provider
      value={{ user: state.user, login, logout, updateProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 