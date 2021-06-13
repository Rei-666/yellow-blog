/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Row, Col
} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { convertFromRaw, RawDraftContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { UserContext } from '../contexts';
import { Post, Profile } from '../components';
import { useFetchWithPagination } from '../hooks';
import { PostInterface, PostDataInterface } from '../interfaces';

const MainView = () => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  const [isLoading, apiResponse] = useFetchWithPagination<PostDataInterface>(
    'http://localhost:41960/api/posts',
    page,
  );
  const [context, setContext] = useContext(UserContext);

  useEffect(() => {
    if (!isLoading) setPosts((prevPosts) => [...prevPosts!, ...apiResponse!.docs]);
  }, [apiResponse, isLoading]);

  const renderPosts = () => {
    if (posts?.length === 0) return 'There are no posts!';
    return posts?.map((post) => {
      const rawState = convertFromRaw({
        ...(post.body as unknown as RawDraftContentState),
        entityMap: {}
      });
      const htmlBody = stateToHTML(rawState);
      return (
        <Post key={post._id} title={post.title}>
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
          <Profile context={context} setContext={setContext} />
        </Col>
      </Row>
    </Container>
  );
};

export default MainView;
