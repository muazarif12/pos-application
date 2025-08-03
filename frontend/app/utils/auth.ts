import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/interfaces/authInterface";


export const decodeToken = (token: string | null): DecodedToken | null => {
    if (!token) return null

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('jwt');
            return null;
        }
        return decoded;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        localStorage.removeItem('jwt'); // Clear invalid token
        return null;
    }
};

export{ }