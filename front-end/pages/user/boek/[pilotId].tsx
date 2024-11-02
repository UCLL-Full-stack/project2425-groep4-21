import React, { useState } from 'react';
import { useRouter } from 'next/router';
import OpdrachtService from '@services/OpdrachtService';
import Header from '@components/header';

const BoekingsPagina: React.FC = () => {
    const router = useRouter();
    const { pilotId } = router.query;

    const [datum, setDatum] = useState('');
    const [tijd, setTijd] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Temporarily hardcode the realtorId
    const realtorId = 1;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!datum || !tijd) {
            setError('Datum en tijd zijn verplicht.');
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

        const nieuweOpdracht = {
            datum: selectedDateTime.toISOString(),
            pilotId: parsedPilotId,
            realtorId: realtorId, // Use the hardcoded realtorId for now until we have roles
            beoordeling: null,
            puntentotaal: 0,
            status: 'Open',
            medias: [],
        };

        try {
            await OpdrachtService.createOpdracht(nieuweOpdracht);
            setSuccessMessage('Boeking succesvol!');
            // Optionally, redirect or reset the form here
        } catch (err) {
            console.error(err);
            setError('Er is een fout opgetreden bij het boeken.');
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h1>Boek een drone-piloot</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="datum">Datum:</label>
                        <input
                            type="date"
                            id="datum"
                            className="form-control"
                            value={datum}
                            onChange={(e) => setDatum(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tijd">Tijd:</label>
                        <input
                            type="time"
                            id="tijd"
                            className="form-control"
                            value={tijd}
                            onChange={(e) => setTijd(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Bevestig Boeking
                    </button>
                </form>
            </div>
        </>
    );
};

export default BoekingsPagina;