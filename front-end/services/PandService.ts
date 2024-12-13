const getAllPanden = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/panden', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

const deletePand = async (pandId: number | undefined) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    if (!token) {
        throw new Error("No token found");
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/panden/${pandId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

const PandService = {
    getAllPanden, deletePand
};

export default PandService;
