import React, { useState } from "react";
import { Opdracht } from "@types";

type Props = {
    onClose: () => void;
    onCreate: (newOpdracht: Opdracht) => void;
};

const CreateOpdrachtModal: React.FC<Props> = ({ onClose, onCreate }) => {
    const [opdrachtData, setOpdrachtData] = useState({
        opdrachtnummer: "",
        datum: "",
        puntentotaal: "",
        status: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOpdrachtData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newOpdracht: Opdracht = {
            opdrachtnummer: Number(opdrachtData.opdrachtnummer),
            datum: opdrachtData.datum,
            puntentotaal: Number(opdrachtData.puntentotaal),
            status: opdrachtData.status,
            beoordeling: null,
            medias: [],
        };
        onCreate(newOpdracht);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-bold mb-4">Create New Opdracht</h3>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Datum</label>
                        <input
                            type="date"
                            name="datum"
                            value={opdrachtData.datum}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Puntentotaal
                        </label>
                        <input
                            type="number"
                            name="puntentotaal"
                            value={opdrachtData.puntentotaal}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={opdrachtData.status}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOpdrachtModal;
