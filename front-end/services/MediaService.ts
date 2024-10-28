const getAllMedia = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/media', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const MediaService = {
    getAllMedia,
};

export default MediaService;
