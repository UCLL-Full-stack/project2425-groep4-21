import React, { useState, useEffect } from 'react';
import PandService from '@services/PandService';
import { mutate } from 'swr';
import { FaTimes } from 'react-icons/fa';

type Props = {
    onClose: () => void;
};

const AddPandForm: React.FC<Props> = ({ onClose }) => {
    const [adres, setAdres] = useState('');
    const [beschrijving, setBeschrijving] = useState('');
    const [userIdMakelaar, setUserIdMakelaar] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setUserIdMakelaar(parsedUser.userId);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userIdMakelaar) {
            setError('User ID Makelaar is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await PandService.createPand({ adres, beschrijving, userIdMakelaar });
            await mutate('/api/panden');
            onClose();
        } catch (error) {
            setError('Error creating pand');
            console.error('Error creating pand:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Pand</h2>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Adres:</label>
                        <input
                            type="text"
                            value={adres}
                            onChange={(e) => setAdres(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Beschrijving:</label>
                        <textarea
                            value={beschrijving}
                            onChange={(e) => setBeschrijving(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Pand'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPandForm;
