import { User } from '../../model/user';
import { Pand } from '../../model/pand';
import { Opdracht } from '../../model/opdracht';
import { Beoordeling } from '../../model/beoordeling';
import { Media } from '../../model/media';

const beoordeling = new Beoordeling({
    beoordelingId: 1,
    score: 9,
    opmerkingen: 'Excellent job',
    userId: 123,
});

const media = new Media({
    type: 'video',
    bestandslocatie: 'https://example.com/video.mp4',
    uploadDatum: new Date(),
    opdrachtId: 101,
});

const opdracht = new Opdracht({
    opdrachtnummer: 101,
    datum: new Date(),
    puntentotaal: 95,
    status: 'Afgerond',
    medias: [media],
    realtorId: 456,
    pilotId: 789,
});

const pand = new Pand({
    id: 101,
    adres: 'Main Street 123',
    beschrijving: 'Mooi appartement in het centrum',
    userIdMakelaar: 456,
    opdrachten: [opdracht],
});

const userData = {
    id: 1,
    voornaam: 'Jan',
    naam: 'Jansen',
    gebruikersnaam: 'jjansen',
    rol: 'realtor' as 'realtor',
    emailadres: 'jan.jansen@example.com',
    portfolio: 'https://portfolio.jansen.com',
    niveau: 'junior',
    bevoegdheden: 'geen',
    isVerified: true,
    beoordelingen: [beoordeling],
    panden: [pand],
    password: 'securePassword123',
};

test('given: valid user data, when: user is created, then: user has the correct properties', () => {
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
    expect(user.getPassword()).toEqual(userData.password);
});

test('given: an existing user, when: adding a beoordeling, then: beoordeling is added to user', () => {
    // given
    const user = new User({
        ...userData,
        beoordelingen: [],
    });

    // when
    user.addBeoordelingToUser(beoordeling);

    // then
    expect(user.getBeoordelingen()).toContain(beoordeling);
});

test('given: an existing user, when: adding a pand, then: pand is added to user', () => {
    // given
    const user = new User({
        ...userData,
        panden: [],
    });

    // when
    user.addPandToUser(pand);

    // then
    expect(user.getPanden()).toContain(pand);
});

test('given: an existing user, when: adding an opdracht, then: opdracht is added to user', () => {
    // given
    const user = new User(userData);

    // when
    user.addOpdrachtToUser(opdracht);

    // then
    expect(user.getOpdrachten()).toContain(opdracht);
});

test('given: user with multiple beoordelingen, when: calculating star rating, then: star rating is calculated correctly', () => {
    // given
    const beoordeling1 = new Beoordeling({
        beoordelingId: 2,
        score: 8,
        opmerkingen: 'Goed',
        userId: 123,
    });
    const beoordeling2 = new Beoordeling({
        beoordelingId: 3,
        score: 10,
        opmerkingen: 'Uitstekend',
        userId: 123,
    });
    const user = new User({
        ...userData,
        beoordelingen: [beoordeling1, beoordeling2],
    });

    // when
    const starRating = user.calculateStarRating();

    // then
    expect(starRating).toBeGreaterThanOrEqual(1);
    expect(starRating).toBeLessThanOrEqual(5);
});

test('given: user is created, when: getters are called, then: they return correct values', () => {
    // given
    const user = new User(userData);

    // then
    expect(user.getId()).toEqual(userData.id);
    expect(user.getVoornaam()).toEqual(userData.voornaam);
    expect(user.getNaam()).toEqual(userData.naam);
    expect(user.getGebruikersnaam()).toEqual(userData.gebruikersnaam);
    expect(user.getEmailadres()).toEqual(userData.emailadres);
    expect(user.getPortfolio()).toEqual(userData.portfolio);
    expect(user.getBevoegdheden()).toEqual(userData.bevoegdheden);
    expect(user.getPassword()).toEqual(userData.password);
});
