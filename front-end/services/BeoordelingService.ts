const getAllBeoordelingen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/beoordelingen', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const BeoordelingService = {
    getAllBeoordelingen,
};

export default BeoordelingService;
