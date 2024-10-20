type Role = 'admin' | 'piloot' | 'makelaar';

type UserInput = {
    voornaam: string;
    naam: string;
    gebruikersnaam: string;
    rol: Role;
    emailadres: string;
    portfolio: string;
    niveau: string;
    bevoegdheden: string;
    beoordelingen: BeoordelingInput[];
    panden: PandInput[];
};

type PandInput = {
    pandId?: number;
    adres: string;
    beschrijving: string;
    userIdMakelaar: number;
    opdracht: OpdrachtInput;
};

type OpdrachtInput = {
    opdrachtnummer?: number;
    datum: Date;
    beoordeling: string;
    puntentotaal: number;
    status: string;
    medias: MediaInput[];
};

type MediaInput = {
    type: 'image' | 'video';
    bestandslocatie: string;
    uploadDatum: Date;
};

type BeoordelingInput = {
    beoordelingId?: number;
    score: number;
    opmerkingen: string;
    userId: number;
};

// type AuthenticationResponse = {
//     token: string;
//     username: string;
//     fullname: string;
//     role: string;
// };

//is voor later in week 7 of 8

export {
    Role,
    UserInput,
    PandInput,
    OpdrachtInput,
    MediaInput,
    BeoordelingInput,
    //AuthenticationResponse,
};
