const getAllPanden = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/panden', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const PandService = {
    getAllPanden,
};

export default PandService;
