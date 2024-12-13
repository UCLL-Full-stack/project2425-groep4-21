export type Role = 'admin' | 'pilot' | 'realtor';

export type User = {
    id: number;
    voornaam: string;
    naam: string;
    gebruikersnaam: string;
    rol: Role;
    emailadres: string;
    portfolio: string;
    niveau: string;
    bevoegdheden: string;
    beoordelingen: Beoordeling[];
    panden: Pand[];
};

export type Pand = {
    id: number;
    adres: string;
    beschrijving: string;
    userIdMakelaar: number;
    opdracht: Opdracht;
};

export type Opdracht = {
    opdrachtnummer?: number;
    datum: string;
    beoordeling: Beoordeling | null;
    puntentotaal: number;
    status: string;
    medias: Media[];
};

export type Media = {
    type: 'image' | 'video';
    bestandslocatie: string;
    uploadDatum: string;
};

export type Beoordeling = {
    beoordelingId?: number;
    score: number;
    opmerkingen: string;
    userId: number;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

// export type AuthenticationResponse = {
//     token: string;
//     username: string;
//     fullname: string;
//     role: Role;
// };
