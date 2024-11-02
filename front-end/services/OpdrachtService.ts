const getAllOpdrachten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/opdrachten', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const createOpdracht = async (opdrachtData: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opdrachten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(opdrachtData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Failed to create opdracht: ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
};

const OpdrachtService = {
    getAllOpdrachten, createOpdracht
};

export default OpdrachtService;
