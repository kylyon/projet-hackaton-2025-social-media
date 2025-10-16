
export const deleteData = async(url, id) => {
    if (typeof url !== 'string') {
        throw new Error('URL must be a string');
    }

    if (id === 'undefined') {
        throw new Error('ID must be defined');
    }

    try {
        const response = await fetch(` ${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
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

