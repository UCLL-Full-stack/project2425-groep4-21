const getAllOpdrachten = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/opdrachten', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        },
    });
};

const createOpdracht = async (opdrachtData: any) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opdrachten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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

const updateOpdrachtStatus = async (opdrachtId: number, status: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opdrachten/${opdrachtId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Failed to update opdracht status: ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
};

const OpdrachtService = {
    getAllOpdrachten, createOpdracht, updateOpdrachtStatus
};

export default OpdrachtService;
