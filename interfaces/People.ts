export interface IPeople {
      mal_id: number,
      url: string,
      website_url: string,
      images: {
        jpg: {
          image_url: string
        }
      },
      name: string,
      given_name: string,
      family_name: string,
      alternate_names: string[],
      birthday: string,
      favorites: number,
      about: string,
      anime: {
          position: string,
          anime: {
            mal_id: number,
            url: string,
            images: {
              jpg: {
                image_url: string,
                small_image_url: string,
                large_image_url: string
              },
              webp: {
                image_url: string,
                small_image_url: string,
                large_image_url: string
              }
            },
            title: string
          }
        }[],
      manga: {
          position: string,
          manga: {
            mal_id: number,
            url: string,
            images: {
              jpg: {
                image_url: string,
                small_image_url: string,
                large_image_url: string
              },
              webp: {
                image_url: string,
                small_image_url: string,
                large_image_url: string
              }
            },
            title: string
          }
        }[]
        ,
      voices: {
          role: string,
          anime: {
            mal_id: number,
            url: string,
            images: {
              jpg: {
                image_url: string,
                small_image_url: string,
                large_image_url: string
              },
              webp: {
                image_url: string,
                small_image_url: string,
                large_image_url: string
              }
            },
            title: string
          },
          character: {
            mal_id: number,
            url: string,
            images: {
              jpg: {
                image_url: string,
                small_image_url: string
              },
              webp: {
                image_url: string,
                small_image_url: string
              }
            },
            name: string
          }
        }[]
    }
