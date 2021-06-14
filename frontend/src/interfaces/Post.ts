import { PaginationInterface } from './Pagination';

interface Author {
  _id: string
  username: string
}

export interface PostDataInterface extends PaginationInterface {
  docs: PostInterface[];
}
export interface PostInterface {
  _id: string;
  title: string;
  body: {
    blocks: any
  };
  author: Author;
  date: string;
}
