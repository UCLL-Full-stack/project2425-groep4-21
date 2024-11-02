const getAllBeoordelingen = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/beoordelingen', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error(`Failed to fetch all beoordelingen: ${response.status} ${response.statusText}`);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response;
};

const getBeoordelingByPilotId = async (pilotId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/beoordelingen/pilot/${pilotId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error(`Failed to fetch beoordelingen for pilot with ID ${pilotId}: ${response.status} ${response.statusText}`);
        return null;
    }

    try {
        return await response.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
};

const BeoordelingService = {
    getAllBeoordelingen, getBeoordelingByPilotId
};

export default BeoordelingService;