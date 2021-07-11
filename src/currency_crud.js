export const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};
    
export const getData = async(url) => {
    const response = await fetch(url);
    return response.json();
};

export const removeData = async (url) => {
    const response = await fetch(url, { method: "DELETE" })
    return response.json();
};
