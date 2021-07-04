/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Row, Col
} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserContext } from '../contexts';
import { Post, Profile } from '../components';
import { useFetchWithPagination } from '../hooks';
import { PostInterface, PaginatedPostsResponseInterface } from '../interfaces';
import { BASE_URL } from '../config';
import { convertPostBodyObjectToHtml } from '../utils';

const MainView = () => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  const [isLoading, apiResponse] = useFetchWithPagination<PaginatedPostsResponseInterface>(
    `${BASE_URL}/api/posts`,
    page,
  );
  const [context] = useContext(UserContext);

  useEffect(() => {
    if (!isLoading) setPosts((prevPosts) => [...prevPosts!, ...apiResponse!.data.docs]);
  }, [apiResponse, isLoading]);

  const renderPosts = () => posts?.map((post) => {
    const htmlBody = convertPostBodyObjectToHtml(post.body);
    return (
      <Post author={post.author} key={post._id} title={post.title} date={post.date}>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </Post>
    );
  });

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={9}>
          <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage((prevPageNumber) => prevPageNumber + 1)}
            hasMore={apiResponse ? apiResponse!.data.hasNextPage : false}
            loader={<h4>Loading...</h4>}
          >
            {renderPosts()}
          </InfiniteScroll>
        </Col>
        <Col>
          { context?.user && <Profile user={context.user} /> }
        </Col>
      </Row>
    </Container>
  );
};

export default MainView;
