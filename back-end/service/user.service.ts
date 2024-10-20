import { User } from '../model/user';
import userDb from '../repository/user.db';

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
}

export { UserService };
