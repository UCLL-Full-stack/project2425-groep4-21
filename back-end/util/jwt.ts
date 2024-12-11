import jwt from 'jsonwebtoken';

const generateJwtToken = ({ username, role }: { username: string; role: string }): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    const options = { expiresIn: `${process.env.JWT_EXPIRES}h`, issuer: 'app' };

    try {
        return jwt.sign({ username, role }, secret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
