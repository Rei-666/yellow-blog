/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Row, Col
} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserContext } from '../contexts';
import { Post, Profile } from '../components';
import { useFetchWithPagination } from '../hooks';
import { PostInterface, PostDataInterface } from '../interfaces';
import { BASE_URL } from '../config';
import { convertPostBodyObjectToHtml } from '../utils';

const MainView = () => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  const [isLoading, apiResponse] = useFetchWithPagination<PostDataInterface>(
    `${BASE_URL}/api/posts`,
    page,
  );
  const [context] = useContext(UserContext);

  useEffect(() => {
    if (!isLoading) setPosts((prevPosts) => [...prevPosts!, ...apiResponse!.docs]);
  }, [apiResponse, isLoading]);

  const renderPosts = () => {
    if (posts?.length === 0) return 'There are no posts!';
    return posts?.map((post) => {
      const htmlBody = convertPostBodyObjectToHtml(post.body);
      return (
        <Post author={post.author} key={post._id} title={post.title}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
        </Post>
      );
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={9}>
          <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage((prevPageNumber) => prevPageNumber + 1)}
            hasMore={apiResponse ? apiResponse!.hasNextPage : false}
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
