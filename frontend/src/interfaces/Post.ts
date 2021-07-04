import { PaginationInterface } from './Pagination';

interface Author {
  _id: string
  username: string
}

export type ApiResponse<T extends {}> = {
  color: string
  data: T
};

interface MultiplePosts extends PaginationInterface{
  docs: PostInterface[]
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

export type MultiplePostsResponseInterface = ApiResponse<Array<PostInterface>>;

export type PaginatedPostsResponseInterface = ApiResponse<MultiplePosts>;

export type PostResponseInterface = ApiResponse<PostInterface>;
