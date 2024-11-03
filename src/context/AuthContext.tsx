import { createContext, useContext, useState, ReactNode } from 'react';
import { UserLogInResponse } from '../types';

interface AuthContextType {
    user: UserLogInResponse;
    token: string | null;
    login: (userData: UserLogInResponse, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const userDefault = {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
    };

    const [user, setUser] = useState<UserLogInResponse>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : userDefault;
    });

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const login = (userData: UserLogInResponse, token: string) => {
        setUser({ ...userData });
        setToken(token);
        localStorage.setItem('user', JSON.stringify({ ...userData }));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(userDefault);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
