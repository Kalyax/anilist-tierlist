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
        name
        avatar{
          medium
        }
        mediaListOptions{
            scoreFormat
        }
    }
}`

const userIdQuery = `#graphql
query ($id: Int){
    User(id: $id){
        id
        name
        avatar{
          medium
        }
        mediaListOptions{
            scoreFormat
        }
    }
}`

export { animeCollectionsQuery, userQuery, userIdQuery }