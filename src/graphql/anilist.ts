const json = (url: string, options: Object) => fetch(url, options).then(res => res.json()).catch(err => { throw err });

export const anilist = (query: string, variables?: Object): Promise<any> => {
    return json('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query, variables
        })
    })
}

export const anilistAuth = (query: string, accessToken:string, variables?: Object): Promise<any> => {
    return json('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query, variables
        })
    })
}