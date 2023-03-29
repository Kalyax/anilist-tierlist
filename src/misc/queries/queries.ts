const animeCollectionsQuery = `#graphql
    query ($id: Int, $type: MediaType) {
      MediaListCollection(userId: $id, type: $type){
        lists {
          isCustomList
          entries{
            score
            media{
              id
              siteUrl
              format
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