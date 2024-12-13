import { User } from '../model/user';
import userDb from '../repository/user.db';
import beoordelingDb from '../repository/beoordeling.db';
import bcrypt from 'bcrypt';
import { UserInput } from '../types';
import {generateJwtToken} from "../util/jwt";

class UserService {
    static async getUsers(): Promise<User[]> {
        return userDb.getAllUsers();
    }

    static async getUserById(id: number): Promise<User | null> {
        const user = await userDb.getUserById(id);
        if (!user) {
            throw new Error(`User ${id} not found`);
        }
        return user;
    }

    static async getUserByUsername({ gebruikersnaam }: { gebruikersnaam: string }): Promise<User> {
        const user = await userDb.getUserByUsername({ gebruikersnaam });
        if (!user) {
            throw new Error(`User with username: ${gebruikersnaam} does not exist.`);
        }
        return user;
    }

    static async createUser(userInput: UserInput): Promise<User> {
        const { voornaam, naam, gebruikersnaam, rol, emailadres, portfolio, niveau, bevoegdheden, password } = userInput;


        const existingUser = await userDb.getUserByUsername({ gebruikersnaam });
        if (existingUser) {
            throw new Error(`User with username ${gebruikersnaam} is already registered.`);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            id: 0,
            voornaam,
            naam,
            gebruikersnaam,
            rol,
            emailadres,
            portfolio,
            niveau,
            bevoegdheden,
            isVerified: false,
            password: hashedPassword,
            panden: [],
            beoordelingen: [],
        });

        return await userDb.createUser(user);
    }

    static async deleteUserById(id: number): Promise<boolean> {
        return userDb.deleteUserById(id);
    }

    static async getPilots(filterOptions?: { minRating?: number; niveau?: string }): Promise<any[]> {
        const { minRating, niveau } = filterOptions || {};
        let pilots = await userDb.getUsersByRole('pilot');

        for (const pilot of pilots) {
            const beoordelingen = await beoordelingDb.getBeoordelingenByUserId(pilot.id);
            pilot.setBeoordelingen(beoordelingen);
        }

        if (minRating !== undefined) {
            pilots = pilots.filter(pilot => {
                const rating = pilot.calculateRating();
                return rating !== undefined && rating >= minRating;
            });
        }

        if (niveau) {
            pilots = pilots.filter(pilot => pilot.getNiveau() === niveau);
        }

        return pilots.map(pilot => ({
            id: pilot.id,
            voornaam: pilot.getVoornaam(),
            naam: pilot.getNaam(),
            gebruikersnaam: pilot.getGebruikersnaam(),
            rol: pilot.getRol(),
            emailadres: pilot.getEmailadres(),
            niveau: pilot.getNiveau(),
            isVerified: pilot.isVerified,
            rating: pilot.calculateRating(),
        }));
    }

    static async authenticate({ gebruikersnaam, password }: UserInput): Promise<{
        role: "admin" | "pilot" | "realtor";
        fullname: string;
        token: string;
        username: string
        userId:  number
    }> {
        const user = await this.getUserByUsername({ gebruikersnaam });

        const isValidPassword = await bcrypt.compare(password, user.getPassword());

        if (!isValidPassword) {
            throw new Error('Incorrect password or username.');
        }

        return {
            token: generateJwtToken({ username: gebruikersnaam, role: user.getRol() }),
            username: user.getGebruikersnaam(),
            fullname: `${user.getVoornaam()} ${user.getNaam()}`,
            role: user.getRol(),
            userId: user.getId(),
        };
    }
};

export { UserService };
