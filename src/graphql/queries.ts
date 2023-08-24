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
        options{
            titleLanguage
        }
        mediaListOptions{
            scoreFormat
        }
    }

    animeList: MediaListCollection(userName: $name, type: ANIME){
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

    mangaList: MediaListCollection(userName: $name, type: MANGA){
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

const userIdQuery = `#graphql
query ($id: Int){
    User(id: $id){
        id
        name
        avatar{
          medium
        }
        options{
            titleLanguage
        }
        mediaListOptions{
            scoreFormat
        }
    }

    animeList: MediaListCollection(userId: $id, type: ANIME){
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

    mangaList: MediaListCollection(userId: $id, type: MANGA){
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

export { animeCollectionsQuery, userQuery, userIdQuery }