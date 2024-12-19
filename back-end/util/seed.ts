import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Users
    const user1 = await prisma.user.upsert({
        where: { emailadres: 'bjorn@example.com' },
        update: {},
        create: {
            voornaam: 'Bjorn',
            naam: 'Thollebeke',
            gebruikersnaam: 'bjorn123',
            rol: 'admin',
            emailadres: 'bjorn@example.com',
            portfolio: 'https://portfolio.com/bjorn',
            niveau: 'Expert',
            bevoegdheden: 'Full Access',
            isVerified: true,
            password: await bcrypt.hash('admin123', 12),
        },
    });

    const user2 = await prisma.user.upsert({
        where: { emailadres: 'anna@example.com' },
        update: {},
        create: {
            voornaam: 'Anna',
            naam: 'Smith',
            gebruikersnaam: 'anna_pilot',
            rol: 'pilot',
            emailadres: 'anna@example.com',
            portfolio: 'https://portfolio.com/anna',
            niveau: 'Intermediate',
            bevoegdheden: 'Limited Access',
            isVerified: false,
            password: await bcrypt.hash('pilot123', 12),
        },
    });

    const user3 = await prisma.user.create({
        data: {
            voornaam: 'John',
            naam: 'Doe',
            gebruikersnaam: 'john_realtor',
            rol: 'realtor',
            emailadres: 'john@example.com',
            portfolio: 'https://portfolio.com/john',
            niveau: 'Beginner',
            bevoegdheden: 'Limited Access',
            isVerified: true,
            password: await bcrypt.hash('realtor123', 12),
        },
    });

    // Panden
    const pand1 = await prisma.pand.create({
        data: {
            adres: '123 Main Street',
            beschrijving: 'Mooi appartement met 3 slaapkamers',
            userIdMakelaar: user1.id,
        },
    });

    const pand2 = await prisma.pand.create({
        data: {
            adres: '456 Elm Street',
            beschrijving: 'Luxe villa met zwembad',
            userIdMakelaar: user1.id,
        },
    });

    const pand3 = await prisma.pand.create({
        data: {
            adres: '789 Oak Street',
            beschrijving: 'Gezellig huisje in een rustige buurt',
            userIdMakelaar: user2.id,
        },
    });

    // Opdrachten
    const opdracht1 = await prisma.opdracht.create({
        data: {
            datum: new Date(),
            puntentotaal: 85,
            status: 'In Progress',
            realtorId: user3.id,
            pilotId: user2.id,
            pandId: pand1.id,
            userId: user1.id,
        },
    });

    const opdracht2 = await prisma.opdracht.create({
        data: {
            datum: new Date(),
            puntentotaal: 90,
            status: 'Completed',
            realtorId: user3.id,
            pilotId: user2.id,
            pandId: pand2.id,
            userId: user1.id,
        },
    });

    //Beoordeling
    await prisma.beoordeling.createMany({
        data: [
            {
                score: 8,
                opmerkingen: 'Goede uitvoering en oplevering.',
                userId: user2.id,
            },
            {
                score: 9,
                opmerkingen: 'Zeer tevreden met het resultaat!',
                userId: user2.id,
            },
            {
                score: 7,
                opmerkingen: 'Enkele verbeterpunten, maar algemeen oké.',
                userId: user2.id,
            },
        ],
    });

    //Media
    await prisma.media.createMany({
        data: [
            {
                type: 'image',
                bestandslocatie: 'https://example.com/image1.jpg',
                uploadDatum: new Date(),
                opdrachtId: opdracht1.opdrachtnummer,
            },
            {
                type: 'video',
                bestandslocatie: 'https://example.com/video1.mp4',
                uploadDatum: new Date(),
                opdrachtId: opdracht2.opdrachtnummer,
            },
        ],
    });
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
