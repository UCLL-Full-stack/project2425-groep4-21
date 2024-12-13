import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OpdrachtService from '@services/OpdrachtService';
import PandService from '@services/PandService';
import Header from '@components/header';
import { Pand } from '@types';

const BoekingsPagina: React.FC = () => {
    const router = useRouter();
    const { pilotId } = router.query;

    const [datum, setDatum] = useState('');
    const [tijd, setTijd] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [panden, setPanden] = useState<Pand[]>([]);
    const [selectedPandId, setSelectedPandId] = useState<number | null>(null);

    const loggedInUser = (typeof window !== 'undefined') ? sessionStorage.getItem('loggedInUser') : null;
    let realtorId: number | null = null;
    if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        realtorId = parsedUser.userId;
    }

    useEffect(() => {
        const fetchPanden = async () => {
            if (!realtorId) return;
            try {
                const response = await PandService.getAllPanden();
                const allPanden = await response.json() as Pand[];

                const realtorPanden = allPanden.filter(p => p.userIdMakelaar === realtorId);
                setPanden(realtorPanden);

                if (realtorPanden.length > 0) {
                    setSelectedPandId(realtorPanden[0].id);
                } else {
                    setSelectedPandId(null);
                }
            } catch (err) {
                console.error('Error fetching panden:', err);
            }
        };

        if (realtorId) {
            fetchPanden();
        }
    }, [realtorId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!datum || !tijd) {
            setError('Datum en tijd zijn verplicht.');
            return;
        }

        if (!selectedPandId) {
            setError('Selecteer een pand.');
            return;
        }

        const selectedDateTime = new Date(`${datum}T${tijd}`);
        if (selectedDateTime < new Date()) {
            setError('De geselecteerde datum en tijd liggen in het verleden.');
            return;
        }

        const parsedPilotId = Number(pilotId);
        if (isNaN(parsedPilotId) || parsedPilotId <= 0) {
            setError('Ongeldige pilot ID.');
            return;
        }

        if (!realtorId) {
            setError('Realtor ID niet gevonden. Log in als een makelaar.');
            return;
        }

        const nieuweOpdracht = {
            datum: selectedDateTime.toISOString(),
            pilotId: parsedPilotId,
            realtorId: realtorId,
            userId: parsedPilotId,
            pandId: selectedPandId,
            beoordeling: null,
            puntentotaal: 0,
            status: 'Open',
            medias: [],
        };

        try {
            await OpdrachtService.createOpdracht(nieuweOpdracht);
            setSuccessMessage('Boeking succesvol!');
            setDatum('');
            setTijd('');
            setSelectedPandId(panden.length > 0 ? panden[0].id : null);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Er is een fout opgetreden bij het boeken.');
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
                        Boek een Drone-Piloot
                    </h1>

                    {error && (
                        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg mb-4 text-center font-medium">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-center font-medium">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="pand"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Selecteer een pand:
                            </label>
                            <select
                                id="pand"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={selectedPandId !== null ? selectedPandId : ''}
                                onChange={(e) => {
                                    const newVal = Number(e.target.value);
                                    setSelectedPandId(isNaN(newVal) ? null : newVal);
                                }}
                                required
                            >
                                <option value="" disabled>Kies een pand</option>
                                {panden.map((pand) => (
                                    <option key={pand.id} value={pand.id}>
                                        {pand.adres} - {pand.beschrijving}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="datum"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Datum:
                            </label>
                            <input
                                type="date"
                                id="datum"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={datum}
                                onChange={(e) => setDatum(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="tijd"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Tijd:
                            </label>
                            <input
                                type="time"
                                id="tijd"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={tijd}
                                onChange={(e) => setTijd(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg transition-colors shadow-sm"
                        >
                            Bevestig Boeking
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BoekingsPagina;
