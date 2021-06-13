import { PaginationInterface } from './Pagination';

export interface PostDataInterface extends PaginationInterface {
  docs: PostInterface[];
}
export interface PostInterface {
  _id: string;
  title: string;
  body: {
    blocks: any
  };
  author: string;
  date: string;
}
