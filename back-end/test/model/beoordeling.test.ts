import { Beoordeling } from '../../model/beoordeling';

// Dummy data
const beoordelingData = {
    beoordelingId: 1,
    score: 8,
    opmerkingen: 'Goed werk',
    userId: 123,
};

// Beoordeling tests

test('given: valid beoordeling data, when: beoordeling is created, then: beoordeling has the correct properties', () => {
    // given
    const beoordeling = new Beoordeling(beoordelingData);

    // then
    expect(beoordeling.getBeoordelingId()).toEqual(beoordelingData.beoordelingId);
    expect(beoordeling.getScore()).toEqual(beoordelingData.score);
    expect(beoordeling.getOpmerkingen()).toEqual(beoordelingData.opmerkingen);
    expect(beoordeling.getUserId()).toEqual(beoordelingData.userId);
});

test('given: two identical beoordelingen, when: comparing them, then: equals returns true', () => {
    // given
    const beoordeling1 = new Beoordeling(beoordelingData);
    const beoordeling2 = new Beoordeling(beoordelingData);

    // when
    const areEqual = beoordeling1.equals(beoordeling2);

    // then
    expect(areEqual).toBe(true);
});

test('given: beoordelingen with different properties, when: comparing them, then: equals returns false', () => {
    // given
    const beoordeling1 = new Beoordeling(beoordelingData);
    const differentBeoordeling = new Beoordeling({
        beoordelingId: 2,
        score: 6,
        opmerkingen: 'Kan beter',
        userId: 124,
    });

    // when
    const areEqual = beoordeling1.equals(differentBeoordeling);

    // then
    expect(areEqual).toBe(false);
});
