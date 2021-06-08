/* eslint-disable import/prefer-default-export */
import paginationOptions from './paginationOptions';

const { limit } = paginationOptions;

const getOffsetFromPage = (page: number | string, size?: number) => {
  const pageNumber: number = (typeof page === 'string') ? parseInt(page, 10) : page;
  if (pageNumber > 1) return (pageNumber - 1) * (size || limit);
  return 0;
};

export { getOffsetFromPage };
