import React, { useState, useEffect } from 'react';
import BeoordelingService from '@services/BeoordelingService';
import { useRouter } from 'next/router';
import BeoordelingDetails from "@components/beoordeling/BeoordelingDetails";
import { Beoordeling } from '@types';

const BeoordelingPage: React.FC = () => {
    const router = useRouter();
    const { beoordelingId } = router.query;

    const [beoordelingen, setBeoordelingen] = useState<Beoordeling[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (beoordelingId) {
            const fetchBeoordeling = async () => {
                try {
                    const data = await BeoordelingService.getBeoordelingByPilotId(Number(beoordelingId));
                    if (data) {
                        setBeoordelingen(data);
                    } else {
                        setError('There are no beoordelingen for this user.');
                    }
                } catch (error) {
                    setError('Pilot not found');
                }
            };

            fetchBeoordeling();
        }
    }, [beoordelingId]);


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {beoordelingen.length > 0 ? (
                beoordelingen.map((beoordeling) => (
                    <BeoordelingDetails key={beoordeling.beoordelingId} beoordeling={beoordeling} />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default BeoordelingPage;
