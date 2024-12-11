import { User } from '../model/user';
import userDb from '../repository/user.db';
import beoordelingDb from '../repository/beoordeling.db';
import bcrypt from 'bcrypt';
import { UserInput } from '../types';

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
}

export { UserService };
