import RenderCards from '../components/RenderCards'
import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

// const UsFch = () => {
//   const { data, isLoading, isError } = useFetch(URL_SEARCH_ANIME({ querys: { q: '' } }))
//   console.log({ isError }, { isLoading })
//   return (
//         <LoadingComponent isError={isError} isLoading={isLoading}>
//             {data}
//         </LoadingComponent>
//   )
// }

const pagination = {
  last_visible_page: 1660,
  has_next_page: true,
  current_page: 1,
  items: {
    count: 25,
    total: 41484,
    per_page: 25
  }
}

const data = [
  {
    mal_id: 2,
    url: 'https://myanimelist.net/manga/2/Berserk',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
        small_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897t.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg'
      },
      webp: {
        image_url: 'https://cdn.myanimelist.net/images/manga/1/157897.webp',
        small_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897t.webp',
        large_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897l.webp'
      }
    },
    approved: true,
    titles: [
      {
        type: 'Default',
        title: 'Berserk'
      },
      {
        type: 'Synonym',
        title: 'Berserk: The Prototype'
      },
      {
        type: 'Synonym',
        title: 'Berserk: The Prototype'
      },
      {
        type: 'Japanese',
        title: 'ベルセルク'
      },
      {
        type: 'English',
        title: 'Berserk'
      }
    ],
    title: 'Berserk',
    title_english: 'Berserk',
    title_japanese: 'ベルセルク',
    title_synonyms: [
      'Berserk: The Prototype'
    ],
    type: 'Manga',
    chapters: null,
    volumes: null,
    status: 'Publishing',
    publishing: true,
    published: {
      from: '1989-08-25T00:00:00+00:00',
      to: null,
      prop: {
        from: {
          day: 25,
          month: 8,
          year: 1989
        },
        to: {
          day: null,
          month: null,
          year: null
        }
      },
      string: 'Aug 25, 1989 to ?'
    },
    score: 9.46,
    scored: 9.46,
    scored_by: 276996,
    rank: 1,
    popularity: 2,
    members: 565871,
    favorites: 106479,
    synopsis: 'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings. Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity. [Written by MAL Rewrite] Included one-shot: Volume 14: Berserk: The Prototype',
    background: "Berserk won the Award for Excellence at the sixth installment of Tezuka Osamu Cultural Prize in 2002. The series has over 50 million copies in print worldwide and has been published in English by Dark Horse since November 4, 2003. It is also published in Italy, Germany, Spain, France, Brazil, South Korea, Hong Kong, Taiwan, Thailand, Poland, México and Turkey. In May 2021, the author Kentaro Miura suddenly died at the age of 54. Chapter 364 of Berserk was published posthumously on September 10, 2021. Miura would often share details about the series' story with his childhood friend and fellow mangaka Kouji Mori. Berserk resumed on June 24, 2022, with Studio Gaga handling the art and Kouji Mori's supervision.",
    authors: [
      {
        mal_id: 1868,
        type: 'people',
        name: 'Miura, Kentarou',
        url: 'https://myanimelist.net/people/1868/Kentarou_Miura'
      },
      {
        mal_id: 49592,
        type: 'people',
        name: 'Studio Gaga',
        url: 'https://myanimelist.net/people/49592/Studio_Gaga'
      }
    ],
    serializations: [
      {
        mal_id: 2,
        type: 'manga',
        name: 'Young Animal',
        url: 'https://myanimelist.net/manga/magazine/2/Young_Animal'
      }
    ],
    genres: [
      {
        mal_id: 1,
        type: 'manga',
        name: 'Action',
        url: 'https://myanimelist.net/manga/genre/1/Action'
      },
      {
        mal_id: 2,
        type: 'manga',
        name: 'Adventure',
        url: 'https://myanimelist.net/manga/genre/2/Adventure'
      },
      {
        mal_id: 46,
        type: 'manga',
        name: 'Award Winning',
        url: 'https://myanimelist.net/manga/genre/46/Award_Winning'
      },
      {
        mal_id: 8,
        type: 'manga',
        name: 'Drama',
        url: 'https://myanimelist.net/manga/genre/8/Drama'
      },
      {
        mal_id: 10,
        type: 'manga',
        name: 'Fantasy',
        url: 'https://myanimelist.net/manga/genre/10/Fantasy'
      },
      {
        mal_id: 14,
        type: 'manga',
        name: 'Horror',
        url: 'https://myanimelist.net/manga/genre/14/Horror'
      },
      {
        mal_id: 37,
        type: 'manga',
        name: 'Supernatural',
        url: 'https://myanimelist.net/manga/genre/37/Supernatural'
      }
    ],
    explicit_genres: [],
    themes: [
      {
        mal_id: 58,
        type: 'manga',
        name: 'Gore',
        url: 'https://myanimelist.net/manga/genre/58/Gore'
      },
      {
        mal_id: 38,
        type: 'manga',
        name: 'Military',
        url: 'https://myanimelist.net/manga/genre/38/Military'
      },
      {
        mal_id: 6,
        type: 'manga',
        name: 'Mythology',
        url: 'https://myanimelist.net/manga/genre/6/Mythology'
      },
      {
        mal_id: 40,
        type: 'manga',
        name: 'Psychological',
        url: 'https://myanimelist.net/manga/genre/40/Psychological'
      }
    ],
    demographics: [
      {
        mal_id: 41,
        type: 'manga',
        name: 'Seinen',
        url: 'https://myanimelist.net/manga/genre/41/Seinen'
      }
    ]
  },
  {
    mal_id: 1706,
    url: 'https://myanimelist.net/manga/1706/JoJo_no_Kimyou_na_Bouken_Part_7__Steel_Ball_Run',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/manga/3/179882.jpg',
        small_image_url: 'https://cdn.myanimelist.net/images/manga/3/179882t.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/manga/3/179882l.jpg'
      },
      webp: {
        image_url: 'https://cdn.myanimelist.net/images/manga/3/179882.webp',
        small_image_url: 'https://cdn.myanimelist.net/images/manga/3/179882t.webp',
        large_image_url: 'https://cdn.myanimelist.net/images/manga/3/179882l.webp'
      }
    },
    approved: true,
    titles: [
      {
        type: 'Default',
        title: 'JoJo no Kimyou na Bouken Part 7: Steel Ball Run'
      },
      {
        type: 'Synonym',
        title: "JoJo's Bizarre Adventure Part 7: Steel Ball Run"
      },
      {
        type: 'Synonym',
        title: 'SBR'
      },
      {
        type: 'Synonym',
        title: "JoJo's Bizarre Adventure Part 7: Steel Ball Run"
      },
      {
        type: 'Synonym',
        title: 'SBR'
      },
      {
        type: 'Japanese',
        title: 'ジョジョの奇妙な冒険 Part7 STEEL BALL RUN'
      },
      {
        type: 'French',
        title: 'Steel Ball Run'
      }
    ],
    title: 'JoJo no Kimyou na Bouken Part 7: Steel Ball Run',
    title_english: null,
    title_japanese: 'ジョジョの奇妙な冒険 Part7 STEEL BALL RUN',
    title_synonyms: [
      "JoJo's Bizarre Adventure Part 7: Steel Ball Run",
      'SBR'
    ],
    type: 'Manga',
    chapters: 96,
    volumes: 24,
    status: 'Finished',
    publishing: false,
    published: {
      from: '2004-01-19T00:00:00+00:00',
      to: '2011-04-19T00:00:00+00:00',
      prop: {
        from: {
          day: 19,
          month: 1,
          year: 2004
        },
        to: {
          day: 19,
          month: 4,
          year: 2011
        }
      },
      string: 'Jan 19, 2004 to Apr 19, 2011'
    },
    score: 9.28,
    scored: 9.28,
    scored_by: 128767,
    rank: 2,
    popularity: 27,
    members: 214227,
    favorites: 36254,
    synopsis: "In the American Old West, the world's greatest race is about to begin. Thousands line up in San Diego to travel over six thousand kilometers for a chance to win the grand prize of fifty million dollars. With the era of the horse reaching its end, contestants are allowed to use any kind of vehicle they wish. Competitors will have to endure grueling conditions, traveling up to a hundred kilometers a day through uncharted wastelands. The Steel Ball Run is truly a one-of-a-kind event. The youthful Johnny Joestar, a crippled former horse racer, has come to San Diego to watch the start of the race. There he encounters Gyro Zeppeli, a racer with two steel balls at his waist instead of a gun. Johnny witnesses Gyro using one of his steel balls to unleash a fantastical power, compelling a man to fire his gun at himself during a duel. In the midst of the action, Johnny happens to touch the steel ball and feels a power surging through his legs, allowing him to stand up for the first time in two years. Vowing to find the secret of the steel balls, Johnny decides to compete in the race, and so begins his bizarre adventure across America on the Steel Ball Run. [Written by MAL Rewrite]",
    background: 'JoJo no Kimyou na Bouken Part 7: Steel Ball Run was originally presented as an unrelated story to the JoJo series and was serialized in Weekly Shounen Jump magazine as Steel Ball Run from issues #8~47 2004. Serialization then transferred to Ultra Jump magazine from issue May 2005 and the series was officially declared as Part 7 of the JoJo no Kimyou na Bouken series.',
    authors: [
      {
        mal_id: 2619,
        type: 'people',
        name: 'Araki, Hirohiko',
        url: 'https://myanimelist.net/people/2619/Hirohiko_Araki'
      }
    ],
    serializations: [
      {
        mal_id: 25,
        type: 'manga',
        name: 'Ultra Jump',
        url: 'https://myanimelist.net/manga/magazine/25/Ultra_Jump'
      }
    ],
    genres: [
      {
        mal_id: 1,
        type: 'manga',
        name: 'Action',
        url: 'https://myanimelist.net/manga/genre/1/Action'
      },
      {
        mal_id: 2,
        type: 'manga',
        name: 'Adventure',
        url: 'https://myanimelist.net/manga/genre/2/Adventure'
      },
      {
        mal_id: 7,
        type: 'manga',
        name: 'Mystery',
        url: 'https://myanimelist.net/manga/genre/7/Mystery'
      },
      {
        mal_id: 37,
        type: 'manga',
        name: 'Supernatural',
        url: 'https://myanimelist.net/manga/genre/37/Supernatural'
      }
    ],
    explicit_genres: [],
    themes: [
      {
        mal_id: 13,
        type: 'manga',
        name: 'Historical',
        url: 'https://myanimelist.net/manga/genre/13/Historical'
      }
    ],
    demographics: [
      {
        mal_id: 41,
        type: 'manga',
        name: 'Seinen',
        url: 'https://myanimelist.net/manga/genre/41/Seinen'
      },
      {
        mal_id: 27,
        type: 'manga',
        name: 'Shounen',
        url: 'https://myanimelist.net/manga/genre/27/Shounen'
      }
    ]
  },
  {
    mal_id: 13,
    url: 'https://myanimelist.net/manga/13/One_Piece',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
        small_image_url: 'https://cdn.myanimelist.net/images/manga/2/253146t.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg'
      },
      webp: {
        image_url: 'https://cdn.myanimelist.net/images/manga/2/253146.webp',
        small_image_url: 'https://cdn.myanimelist.net/images/manga/2/253146t.webp',
        large_image_url: 'https://cdn.myanimelist.net/images/manga/2/253146l.webp'
      }
    },
    approved: true,
    titles: [
      {
        type: 'Default',
        title: 'One Piece'
      },
      {
        type: 'Japanese',
        title: 'ONE PIECE'
      },
      {
        type: 'English',
        title: 'One Piece'
      }
    ],
    title: 'One Piece',
    title_english: 'One Piece',
    title_japanese: 'ONE PIECE',
    title_synonyms: [],
    type: 'Manga',
    chapters: null,
    volumes: null,
    status: 'Publishing',
    publishing: true,
    published: {
      from: '1997-07-22T00:00:00+00:00',
      to: null,
      prop: {
        from: {
          day: 22,
          month: 7,
          year: 1997
        },
        to: {
          day: null,
          month: null,
          year: null
        }
      },
      string: 'Jul 22, 1997 to ?'
    },
    score: 9.2,
    scored: 9.2,
    scored_by: 314268,
    rank: 3,
    popularity: 3,
    members: 514239,
    favorites: 101768,
    synopsis: 'Gol D. Roger, a man referred to as the "Pirate King," is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins. Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new Pirate King. Armed with just a straw hat, a small boat, and an elastic body, he sets out on a fantastic journey to gather his own crew and a worthy ship that will take them across the Grand Line to claim the greatest status on the high seas. [Written by MAL Rewrite]',
    background: "One Piece is the highest selling manga series of all time, with over 500 million copies in circulation as of 2022. Volume 67 of the series currently holds the record for highest first print run of any manga (including books) of all time in Japan, with 4.05 million in 2012. The series was a finalist for the Tezuka Osamu Cultural Prize three times in a row from 2000 to 2002. In 2012, it won the 41st Japan Cartoonists Association Award Grand Prize, alongside Kimuchi Yokoyama's Neko Darake. VIZ Media has published One Piece in English under the Shonen Jump imprint since January 2, 2003 and in 3-in-1 omnibus editions since December 1, 2009. VIZ Media released three boxed sets for the manga; the first including the first 23 volumes released on November 5, 2013, the second including volumes 24-46 released on November 4, 2014, and the third including volumes 47-70 released on October 4, 2016. The series has also been published in numerous amounts of languages worldwide including; Korean, Malay, Indonesian, Chinese, Thai, Vietnamese, German, French, Italian, Spanish, Portuguese, Swedish, Danish, Norwegian, Finnish, Polish, Turkish, and Russian.",
    authors: [
      {
        mal_id: 1881,
        type: 'people',
        name: 'Oda, Eiichiro',
        url: 'https://myanimelist.net/people/1881/Eiichiro_Oda'
      }
    ],
    serializations: [
      {
        mal_id: 83,
        type: 'manga',
        name: 'Shounen Jump (Weekly)',
        url: 'https://myanimelist.net/manga/magazine/83/Shounen_Jump_Weekly'
      }
    ],
    genres: [
      {
        mal_id: 1,
        type: 'manga',
        name: 'Action',
        url: 'https://myanimelist.net/manga/genre/1/Action'
      },
      {
        mal_id: 2,
        type: 'manga',
        name: 'Adventure',
        url: 'https://myanimelist.net/manga/genre/2/Adventure'
      },
      {
        mal_id: 10,
        type: 'manga',
        name: 'Fantasy',
        url: 'https://myanimelist.net/manga/genre/10/Fantasy'
      }
    ],
    explicit_genres: [],
    themes: [],
    demographics: [
      {
        mal_id: 27,
        type: 'manga',
        name: 'Shounen',
        url: 'https://myanimelist.net/manga/genre/27/Shounen'
      }
    ]
  }]

describe.concurrent('components/RenderCards,tsx', () => {
  it('Cards must be rendered with correct data', async () => {
    render(<RenderCards type='anime' data={data} pagination={pagination} isLoading={false} />)
    const divLoader = screen.getAllByRole('img')
    data?.forEach(anime => {
      expect(screen.getByText(anime?.title)).toBeDefined()
    })
    expect(divLoader).toHaveLength(3)
  })
})
