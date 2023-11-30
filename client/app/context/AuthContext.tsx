'use client'

import { User } from "firebase/auth";
import { useContext, createContext, useState } from "react";

// Define the type for the context value
type AuthContextType = {
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

// Create the context with initial values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define Props type for AuthContextProvider
type AuthContextProviderProps = {
    children: React.ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>();

    // Create the context value to be provided
    const authContextValue: AuthContextType = {
        user,
        setUser,
    };

    return (
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};
