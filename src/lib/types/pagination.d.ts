// To parse this data:
//
//   import { Convert, Pagination } from "./file";
//
//   const pagination = Convert.toPagination(json);

export type Pagination = {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: Items
}

export type Items = {
  count: number
  total: number
  per_page: number
}

