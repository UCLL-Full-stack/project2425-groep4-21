import { User } from '../model/user';
import database from '../util/database';

const users = [
    new User({
        id: 1,
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'pilot',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'all',
        beoordelingen: [],
        panden: [],
        isVerified: true,
    }),
    new User({
        id: 2,
        voornaam: 'Pieter',
        naam: 'Pieters',
        gebruikersnaam: 'ppieters',
        rol: 'pilot',
        emailadres: 'pieter.pieters@example.com',
        portfolio: 'https://portfolio.pieters.com',
        niveau: 'senior',
        bevoegdheden: 'limited',
        beoordelingen: [],
        panden: [],
        isVerified: true,
    }),
    new User({
        id: 3,
        voornaam: 'Karin',
        naam: 'Karels',
        gebruikersnaam: 'kkarels',
        rol: 'pilot',
        emailadres: 'karin.karels@example.com',
        portfolio: 'https://portfolio.karels.com',
        niveau: 'intermediate',
        bevoegdheden: 'read-only',
        beoordelingen: [],
        panden: [],
        isVerified: true,
    }),
];

const getAllUsers = async (): Promise<User[]> => {
    // Haal alle gebruikers op uit de database inclusief panden en opdrachten
    const usersPrisma = await database.user.findMany({
        include: {
            panden: true, // Inclusief de panden van de gebruiker
            opdrachten: true, // Inclusief de opdrachten van de gebruiker
        },
    });

    // Map de Prisma data naar je User model met de `from` methode
    return usersPrisma.map((userPrisma) => User.from(userPrisma));
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

const getUsersByRoleAndRating = (role: string, rating: number): User[] => {
    return users.filter(
        (user) => user.getRol() === role && user.getBeoordelingen().some((b) => b.score >= rating)
    );
};

const getUsersByIdsAndRole = (ids: number[], role: string): User[] => {
    return users.filter((user) => ids.includes(user.id) && user.getRol() === role);
};

const getUsersByRole = async (role: 'pilot' | 'realtor' | 'admin'): Promise<User[]> => {
    return users.filter((user) => user.getRol() === role);
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    getUsersByRoleAndRating,
    getUsersByIdsAndRole,
    getUsersByRole,
};
