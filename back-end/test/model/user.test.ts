// import { User } from '../../model/user';
// import { Pand } from '../../model/pand';
// import { Opdracht } from '../../model/opdracht';
// import { Beoordeling } from '../../model/beoordeling';
// import { Media } from '../../model/media';

// // Dummy data for Beoordeling
// const beoordeling = new Beoordeling({
//     beoordelingId: 1,
//     score: 9,
//     opmerkingen: 'Excellent job',
//     userId: 123,
// });

// // Dummy data for Media
// const media = new Media({
//     type: 'video',
//     bestandslocatie: 'https://example.com/video.mp4',
//     uploadDatum: new Date(),
//     opdrachtId: 101,
// });

// // Dummy data for Opdracht
// const opdracht = new Opdracht({
//     opdrachtnummer: 101,
//     datum: new Date(),
//     beoordeling: beoordeling,
//     puntentotaal: 95,
//     status: 'Afgerond',
//     medias: [media],
//     realtorId: 456,
//     pilotId: 789,
// });

// // Dummy data for Pand
// const pand = new Pand({
//     pandId: 101,
//     adres: 'Main Street 123',
//     beschrijving: 'Mooi appartement in het centrum',
//     userIdMakelaar: 456,
//     opdrachten: [opdracht],
// });

// const userData = {
//     id: 1,
//     voornaam: 'Jan',
//     naam: 'Jansen',
//     gebruikersnaam: 'jjansen',
//     rol: 'realtor' as 'realtor',
//     emailadres: 'jan.jansen@example.com',
//     portfolio: 'https://portfolio.jansen.com',
//     niveau: 'junior',
//     bevoegdheden: 'geen',
//     isVerified: true,
//     beoordelingen: [beoordeling],
//     panden: [pand],
// };

// // User tests

// test('given: valid user data, when: user is created, then: user has the correct properties', () => {
//     // given
//     // when
//     const user = new User(userData);

//     // then
//     expect(user.getVoornaam()).toEqual(userData.voornaam);
//     expect(user.getNaam()).toEqual(userData.naam);
//     expect(user.getGebruikersnaam()).toEqual(userData.gebruikersnaam);
//     expect(user.getRol()).toEqual(userData.rol);
//     expect(user.getEmailadres()).toEqual(userData.emailadres);
//     expect(user.getPortfolio()).toEqual(userData.portfolio);
//     expect(user.getNiveau()).toEqual(userData.niveau);
//     expect(user.getBevoegdheden()).toEqual(userData.bevoegdheden);
//     expect(user.getBeoordelingen()).toContain(beoordeling);
//     expect(user.getPanden()).toContain(pand);
// });

// test('given: an existing user, when: adding a beoordeling, then: beoordeling is added to user', () => {
//     // given
//     const user = new User({
//         ...userData,
//         beoordelingen: [],
//     });

//     // when
//     user.addBeoordelingToUser(beoordeling);

//     // then
//     expect(user.getBeoordelingen()).toContain(beoordeling);
// });

// test('given: an existing user, when: adding a pand, then: pand is added to user', () => {
//     // given
//     const user = new User({
//         ...userData,
//         panden: [],
//     });

//     // when
//     user.addPandToUser(pand);

//     // then
//     expect(user.getPanden()).toContain(pand);
// });

// test('given: an existing user, when: adding an opdracht, then: opdracht is added to user', () => {
//     // given
//     const user = new User(userData);

//     // when
//     user.addOpdrachtToUser(opdracht);

//     // then
//     expect(user.getOpdrachten()).toContain(opdracht);
// });
