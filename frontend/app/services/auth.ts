import axios from "axios"
import { UserType } from "@/interfaces/authInterface";
import Cookies from 'js-cookie'

const API_URL = 'http://localhost:5600/auth';

// Helper function to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
    async signUp(userData: {
        email: string;
        name: string;
        password: string;
        userType: UserType;
    }) {
        const response = await axios.post(`${API_URL}/signUp`, userData);
        return response.data;
    },

    async signIn(credentials: {
        email: string;
        password: string;
    }) {
        // Remove withCredentials since we're not using cookies anymore
        const response = await axios.post(`${API_URL}/signIn`, credentials);

        // Store the received token in localStorage
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            Cookies.set('authToken', response.data.token, { secure: true, sameSite: 'strict', expires: 7 });
        }

        return response.data;
    }
};





