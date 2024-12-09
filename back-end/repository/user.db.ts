import { User } from '../model/user';
import database from "../util/database";
import { User as UserPrisma } from '@prisma/client';
import {Pand} from "../model/pand";
import {Opdracht} from "../model/opdracht";


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
    const usersPrisma: UserPrisma[] = await database.user.findMany({
        include: {
            panden: true,
            opdrachten: true,
            userBeoordeling: {
                include: {
                    beoordeling: true
                }
            },
        },
    });

    return usersPrisma.map(userPrisma => User.from(userPrisma));
};

const getUserById = async (id: number): Promise<User | null> => {
    const userPrisma = await database.user.findUnique({
        where: { id: id },
        include: {
            panden: {
                include: {
                    opdrachten: true
                }
            },
            opdrachten: true,
            userBeoordeling: {
                include: {
                    beoordeling: true
                }
            },
        },
    });

    if (!userPrisma) {
        return null;
    }

    const panden = userPrisma.panden.map(pand => new Pand({
        ...pand,
        opdrachten: pand.opdrachten.map(opdracht => new Opdracht(opdracht))
    }));

    return User.from({
        ...userPrisma,
        panden
    });
};

const createUser = (newUser: User): User => {
    users.push(newUser);
    return newUser;
};

const deleteUserById = async (id: number): Promise<boolean> => {
    try {
        await database.user.delete({
            where: { id: id },
        });
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
};


const getUsersByRoleAndRating = (role: string, rating: number): User[] => {
    return users.filter(user => user.getRol() === role && user.getBeoordelingen().some(b => b.getScore() >= rating));
};

const getUsersByIdsAndRole = (ids: number[], role: string): User[] => {
    return users.filter(user => ids.includes(user.id) && user.getRol() === role);
};

const getUsersByRole = async (role: 'pilot' | 'realtor' | 'admin'): Promise<User[]> => {
    return users.filter(user => user.getRol() === role);
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    getUsersByRoleAndRating,
    getUsersByIdsAndRole,
    getUsersByRole
};
