const getAllOpdrachten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/opdrachten', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const OpdrachtService = {
    getAllOpdrachten,
};

export default OpdrachtService;
