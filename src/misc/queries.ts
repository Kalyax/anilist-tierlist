const animeCollectionsQuery = `#graphql
    query ($id: Int) {
      MediaListCollection(userId: $id, type: ANIME){
        lists {
          isCustomList
          entries{
            score
            media{
              id
              siteUrl
              title{
                english
              }
              coverImage {
                medium
              }
            }
          }
        }
      }
}`

const userQuery = `#graphql
query ($name: String){
    User(name: $name){
        id
        mediaListOptions{
            scoreFormat
        }
    }
}`

export { animeCollectionsQuery, userQuery }