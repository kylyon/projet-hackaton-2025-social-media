export const getMultipleData = async ([...urls]) => {
    
    if (!urls.every(url => typeof url === 'string')) {
        throw new Error('All arguments must be strings representing URLs');
    }

    try {
        
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};