import { User } from '../model/user';

const users = [
    new User({
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'admin',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'all',
        beoordelingen: [],
        panden: [],
    }),
    new User({
        voornaam: 'Pieter',
        naam: 'Pieters',
        gebruikersnaam: 'ppieters',
        rol: 'user',
        emailadres: 'pieter.pieters@example.com',
        portfolio: 'https://portfolio.pieters.com',
        niveau: 'senior',
        bevoegdheden: 'limited',
        beoordelingen: [],
        panden: [],
    }),
    new User({
        voornaam: 'Karin',
        naam: 'Karels',
        gebruikersnaam: 'kkarels',
        rol: 'guest',
        emailadres: 'karin.karels@example.com',
        portfolio: 'https://portfolio.karels.com',
        niveau: 'intermediate',
        bevoegdheden: 'read-only',
        beoordelingen: [],
        panden: [],
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = (id: number): User | null => {
    const user = users.find((u, index) => index === id);
    return user || null;
};

const createUser = (newUser: User): User => {
    users.push(newUser);
    return newUser;
};

const deleteUserById = (id: number): boolean => {
    const userIndex = users.findIndex((u, index) => index === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
};
