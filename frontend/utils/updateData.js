
export const updateData = async(url, id, data) => {
    if (typeof url !== 'string') {
        throw new Error('URL must be a string');
    }

    if (id === 'undefined') {
        throw new Error('ID must be defined');
    }

    try {
        const response = await fetch(` ${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

