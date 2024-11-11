// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Maak enkele Users aan
    const user1 = await prisma.user.create({
        data: {
            voornaam: 'Bjorn',
            naam: 'Thollebeke',
            gebruikersnaam: 'bjorn123',
            rol: 'piloot',
            emailadres: 'bjorn@example.com',
            portfolio: 'https://portfolio.com/bjorn',
            niveau: 'Expert',
            bevoegdheden: 'Full Access',
            isVerified: true,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            voornaam: 'Anna',
            naam: 'Smith',
            gebruikersnaam: 'anna_pilot',
            rol: 'piloot',
            emailadres: 'anna@example.com',
            portfolio: 'https://portfolio.com/anna',
            niveau: 'Intermediate',
            bevoegdheden: 'Limited Access',
            isVerified: false,
        },
    });

    // Maak enkele Panden aan en koppel ze aan de Users
    const pand1 = await prisma.pand.create({
        data: {
            adres: '123 Main Street',
            beschrijving: 'Mooi appartement met 3 slaapkamers',
            userIdMakelaar: user1.id, // Koppel aan user1 (realtor)
        },
    });

    const pand2 = await prisma.pand.create({
        data: {
            adres: '456 Elm Street',
            beschrijving: 'Luxe villa met zwembad',
            userIdMakelaar: user1.id, // Koppel ook aan user1 (realtor)
        },
    });

    const pand3 = await prisma.pand.create({
        data: {
            adres: '789 Oak Street',
            beschrijving: 'Gezellig huisje in een rustige buurt',
            userIdMakelaar: user2.id, // Koppel aan user2 (pilot)
        },
    });

    console.log('Seeding succesvol voltooid!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
