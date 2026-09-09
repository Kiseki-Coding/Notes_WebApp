import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import api from "../api";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const login = async (
        username: string,
        password: string
    ) => {
        const formData = new URLSearchParams();

        formData.append("username", username);
        formData.append("password", password);

        const response = await api.post(
            "/auth/token",
            formData,
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
            }
        );

        const accessToken = response.data.access_token;

        localStorage.setItem("token", accessToken);
        setToken(accessToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const value: AuthContextType = {
        token,
        isAuthenticated: token !== null,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
}