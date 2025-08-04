import axios from "axios"
import { UserType } from "@/interfaces/authInterface";

const API_URL = 'http://localhost:5600/auth';

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
        const response = await axios.post(`${API_URL}/signIn`, credentials,{ withCredentials: true });
        return response.data;
    }
};





