import { User } from '../../model/user';
import { Pand } from '../../model/pand';
import { Opdracht } from '../../model/opdracht';
import { Beoordeling } from '../../model/beoordeling';
import { Media } from '../../model/media';

// Dummy data
const beoordeling = new Beoordeling({
    beoordelingId: 1,
    score: 9,
    opmerkingen: 'Excellent job',
    userId: 123,
});

const pand = new Pand({
    pandId: 101,
    adres: 'Main Street 123',
    beschrijving: 'Mooi appartement in het centrum',
    userIdMakelaar: 456,
    opdracht: new Opdracht({
        opdrachtnummer: 101,
        datum: new Date(),
        beoordeling: 'Goed uitgevoerd',
        puntentotaal: 95,
        status: 'Afgerond',
        medias: [
            new Media({
                type: 'video',
                bestandslocatie: 'https://example.com/video.mp4',
                uploadDatum: new Date(),
            }),
        ],
    }),
});

const opdracht = new Opdracht({
    opdrachtnummer: 102,
    datum: new Date(),
    beoordeling: 'Prima',
    puntentotaal: 85,
    status: 'In uitvoering',
    medias: [
        new Media({
            type: 'image',
            bestandslocatie: 'https://example.com/image.jpg',
            uploadDatum: new Date(),
        }),
    ],
});

// User tests

test('given: valid user data, when: user is created, then: user has the correct properties', () => {
    // given
    const userData = {
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'student',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'geen',
        beoordelingen: [beoordeling],
        panden: [pand],
    };

    // when
    const user = new User(userData);

    // then
    expect(user.getVoornaam()).toEqual(userData.voornaam);
    expect(user.getNaam()).toEqual(userData.naam);
    expect(user.getGebruikersnaam()).toEqual(userData.gebruikersnaam);
    expect(user.getRol()).toEqual(userData.rol);
    expect(user.getEmailadres()).toEqual(userData.emailadres);
    expect(user.getPortfolio()).toEqual(userData.portfolio);
    expect(user.getNiveau()).toEqual(userData.niveau);
    expect(user.getBevoegdheden()).toEqual(userData.bevoegdheden);
    expect(user.getBeoordelingen()).toContain(beoordeling);
    expect(user.getPanden()).toContain(pand);
});

test('given: an existing user, when: adding a beoordeling, then: beoordeling is added to user', () => {
    // given
    const user = new User({
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'student',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'geen',
        beoordelingen: [],
        panden: [pand],
    });

    // when
    user.addBeoordelingToUser(beoordeling);

    // then
    expect(user.getBeoordelingen()).toContain(beoordeling);
});

test('given: an existing user, when: adding a pand, then: pand is added to user', () => {
    // given
    const user = new User({
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'student',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'geen',
        beoordelingen: [beoordeling],
        panden: [],
    });

    // when
    user.addPandToUser(pand);

    // then
    expect(user.getPanden()).toContain(pand);
});

test('given: an existing user, when: adding an opdracht, then: opdracht is added to user', () => {
    // given
    const user = new User({
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'student',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'geen',
        beoordelingen: [beoordeling],
        panden: [pand],
    });

    // when
    user.addOpdrachtToUser(opdracht);

    // then
    expect(user.getOpdrachten()).toContain(opdracht);
});

test('given: two identical users, when: comparing them, then: equals returns true', () => {
    // given
    const userData = {
        voornaam: 'Jan',
        naam: 'Jansen',
        gebruikersnaam: 'jjansen',
        rol: 'student',
        emailadres: 'jan.jansen@example.com',
        portfolio: 'https://portfolio.jansen.com',
        niveau: 'junior',
        bevoegdheden: 'geen',
        beoordelingen: [beoordeling],
        panden: [pand],
    };

    const user1 = new User(userData);
    const user2 = new User(userData);

    // when
    const areEqual = user1.equals(user2);

    // then
    expect(areEqual).toBe(true);
});
