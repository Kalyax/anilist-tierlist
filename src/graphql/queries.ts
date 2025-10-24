const userQuery = `#graphql
query ($name: String){
    User(name: $name){
        id
        name
        about(asHtml: false)
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
              romaji
              native
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
              romaji
              native
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
        about(asHtml: false)
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
              romaji
              native
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
              romaji
              native
            }
            coverImage {
              medium
            }
          }
        }
      }
    }
}`

const viewerQuery =
`#graphql
{
  Viewer {
    id
    name
    avatar{
      medium
    }
  }
}
`;

const changeScoreQuery = `#graphql
mutation ChangeScoreQuery($score: Float, $id: Int) {
  SaveMediaListEntry(score: $score, mediaId: $id){
    id
  }
}
`;

export { userQuery, userIdQuery, viewerQuery, changeScoreQuery }