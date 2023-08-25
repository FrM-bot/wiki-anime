// To parse this data:
//
//   import { Convert, SeasonResponse } from "./file";
//
//   const seasonResponse = Convert.toSeasonResponse(json);

export type SeasonResponse = {
  data: Season[]
}

export type Season = {
  year: number
  seasons: string[]
}
