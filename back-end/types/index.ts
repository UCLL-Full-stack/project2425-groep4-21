type Role = 'admin' | 'pilot' | 'realtor';

type UserInput = {
    id: number;
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
    password: string;
};

type PandInput = {
    id?: number;
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
    mediaId?: number;
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

declare global {
    namespace Express {
        interface Request {
            user?: UserInput;
        }
    }
}

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
