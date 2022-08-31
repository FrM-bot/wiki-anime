export interface IIMage {
  jpg: {
    image_url: string
    large_image_url: string
    small_image_url: string
  }
  webp: {
    image_url: string
    large_image_url: string
    small_image_url: string
  }
}

export interface IGeneres {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }

export interface IManga {
    chapters: number,
    volumes: number,
    status: string,
    // published: {},

    // authors: [],
    // serializations: [],
    }

export interface IAnimeManga extends IManga {
    approved: boolean
    background: string
    // broadcast: { day: 'Thursdays', time: '23:30', timezone: 'Asia/Tokyo', string: 'Thursdays at 23:30 (JST)' }
    demographics: []
    duration: string
    episodes: number
    explicit_genres: []
    favorites: number
    genres: IGeneres[]
    images: IIMage
    // licensors: []
    mal_id: number
    members: number
    popularity: number
    // producers: (10)[{… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }]
    rank: number
    rating: string
    score: number
    scored_by: number
    season: string
    source: string
    status: string
    // studios: [{… }]
    synopsis: string
    // themes: [{… }]
    title: string
    title_english: string
    title_japanese: string
    title_synonyms: string
    type: string
    url: string
  }
