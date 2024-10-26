import { User } from '../model/user';
import userDb from '../repository/user.db';
import beoordelingDb from '../repository/beoordeling.db';

class UserService {
    static async getUsers(): Promise<User[]> {
        return userDb.getAllUsers();
    }

    static async getUserById(id: number): Promise<User | null> {
        const user = userDb.getUserById(id);
        if (!user) {
            throw new Error(`User ${id} not found`);
        }
        return user;
    }

    static async createUser(newUser: User): Promise<User> {
        return userDb.createUser(newUser);
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

        // Pas filters toe
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
