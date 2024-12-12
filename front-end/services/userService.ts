import {User} from "@types";

const getAllUsers = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    if (!token) {
        throw new Error("No token found");
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
               },
    });
};

const loginUser = (user: { password: string; username: string }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: {
    voornaam: string;
    naam: string;
    gebruikersnaam: string;
    rol: string;
    emailadres: string;
    portfolio: string;
    niveau: string;
    bevoegdheden: string;
    password: string;
}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getAllUsers,
    loginUser,
    registerUser
};

export default UserService;
