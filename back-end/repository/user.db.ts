import { User } from '../model/user';
import database from "../util/database";
import { User as UserPrisma } from '@prisma/client';
import { Pand } from "../model/pand";
import { Opdracht } from "../model/opdracht";

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

const getUserByUsername = async ({ gebruikersnaam }: { gebruikersnaam: string }): Promise<User | null> => {
    const userPrisma = await database.user.findFirst({
        where: { gebruikersnaam },
    });

    return userPrisma ? User.from(userPrisma) : null;
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

const createUser = async (newUser: User): Promise<User> => {
    const createdUser = await database.user.create({
        data: {
            voornaam: newUser.getVoornaam(),
            naam: newUser.getNaam(),
            gebruikersnaam: newUser.getGebruikersnaam(),
            rol: newUser.getRol(),
            emailadres: newUser.getEmailadres(),
            portfolio: newUser.getPortfolio(),
            niveau: newUser.getNiveau() || '',
            bevoegdheden: newUser.getBevoegdheden(),
            isVerified: newUser.isVerified,
            password: newUser.getPassword(),
        },
    });

    return User.from(createdUser);
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

// const getUsersByRoleAndRating = (role: string, rating: number): User[] => {
//     return users.filter(user => user.getRol() === role && user.getBeoordelingen().some(b => b.getScore() >= rating));
// };
//
// const getUsersByIdsAndRole = (ids: number[], role: string): User[] => {
//     return users.filter(user => ids.includes(user.id) && user.getRol() === role);
// };

const getUsersByRole = async (role: 'pilot' | 'realtor' | 'admin'): Promise<User[]> => {
    const usersPrisma = await database.user.findMany({
        where: { rol: role },
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

    return usersPrisma.map(userPrisma => {
        const panden = userPrisma.panden.map(pand => new Pand({
            ...pand,
            opdrachten: pand.opdrachten.map(opdracht => new Opdracht(opdracht))
        }));

        return User.from({
            ...userPrisma,
            panden
        });
    });
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    //getUsersByRoleAndRating,
    //getUsersByIdsAndRole,
    getUsersByRole,
    getUserByUsername
};
