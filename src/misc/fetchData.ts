export default async function fetchData(query: string, variables?: Object): Promise<any>{
    const body = variables == undefined ? {query} : {query, variables}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body)
    };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('https://graphql.anilist.co', options);
            const json = await res.json()
            resolve(json)
        }
        catch (err) {
            reject(err)
        }
    })
}