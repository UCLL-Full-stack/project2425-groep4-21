// import { UserService } from '../../service/user.service';
// import { User } from '../../model/user';
// import userDb from '../../repository/user.db';

// jest.mock('../../repository/user.db', () => ({
//     getAllUsers: jest.fn(),
//     getUserById: jest.fn(),
//     createUser: jest.fn(),
//     deleteUserById: jest.fn(),
// }));

// describe('UserService', () => {
//     test('retrieves all users', async () => {
//         const userList = [new User({
//             id: 1,
//             voornaam: 'John',
//             naam: 'Doe',
//             gebruikersnaam: 'johndoe',
//             rol: 'admin',
//             emailadres: 'john.doe@example.com',
//             portfolio: 'portfolio link',
//             niveau: 'senior',
//             bevoegdheden: 'all',
//             panden: [],
//             isVerified: true
//         })];
//         (userDb.getAllUsers as jest.Mock).mockResolvedValue(userList);

//         const result = await UserService.getUsers();
//         expect(result).toEqual(userList);
//     });

//     test('retrieves user by ID', async () => {
//         const user = new User({
//             id: 1,
//             voornaam: 'John',
//             naam: 'Doe',
//             gebruikersnaam: 'johndoe',
//             rol: 'admin',
//             emailadres: 'john.doe@example.com',
//             portfolio: 'portfolio link',
//             niveau: 'senior',
//             bevoegdheden: 'all',
//             panden: [],
//             isVerified: true
//         });
//         (userDb.getUserById as jest.Mock).mockResolvedValue(user);

//         const result = await UserService.getUserById(1);
//         expect(result).toEqual(user);
//     });

//     test('throws an error if user by ID is not found', async () => {
//         (userDb.getUserById as jest.Mock).mockResolvedValue(null);

//         await expect(UserService.getUserById(1)).rejects.toThrow('User 1 not found');
//     });

//     test('creates a new user', async () => {
//         const newUser = new User({
//             id: 1,
//             voornaam: 'John',
//             naam: 'Doe',
//             gebruikersnaam: 'johndoe',
//             rol: 'admin',
//             emailadres: 'john.doe@example.com',
//             portfolio: 'portfolio link',
//             niveau: 'senior',
//             bevoegdheden: 'all',
//             panden: [],
//             isVerified: true
//         });
//         (userDb.createUser as jest.Mock).mockResolvedValue(newUser);

//         const result = await UserService.createUser(newUser);
//         expect(result).toEqual(newUser);
//     });

//     test('deletes user by ID', async () => {
//         (userDb.deleteUserById as jest.Mock).mockResolvedValue(true);

//         const result = await UserService.deleteUserById(1);
//         expect(result).toBe(true);
//     });
// });
