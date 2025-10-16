
export const postData = async(url, data) => {
    if (typeof url !== 'string') {
        throw new Error('URL must be a string');
    }
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be a non-null object');
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

