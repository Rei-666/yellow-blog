import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import {
  EditorState, convertToRaw, convertFromRaw, ContentState
} from 'draft-js';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import { PostEditor } from '../components';

interface EditorParams {
  id?: string
}

const EditorView = () => {
  const { id } = useParams<EditorParams>();
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      const loadingState = EditorState.createWithContent(ContentState.createFromText('Loading..'));
      setEditorState(loadingState);
      const fetchPostAndUpdateEditorState = async () => {
        const response = await fetch(`${BASE_URL}/api/posts/${id}`);
        const parsedData = await response.json();
        const fetchedEditorState = EditorState.createWithContent(
          convertFromRaw({ entityMap: {}, ...parsedData.body })
        );
        setTitle(parsedData.title);
        setEditorState(fetchedEditorState);
      };
      fetchPostAndUpdateEditorState();
    }
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    const rawState = convertToRaw(editorState.getCurrentContent());
    const url = id ? `${BASE_URL}/api/posts/${id}` : `${BASE_URL}/api/posts`;
    const method = id ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, body: rawState })
      });
      const parsedData = await response.json();
      if (parsedData?.success) {
        // eslint-disable-next-line no-alert
        alert(id ? 'You edited a post!' : 'You created a post!');
        setLoading(false);
        history.push(`/posts/${parsedData.id}`);
      } else {
        throw new Error();
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong :(');
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-content-center">
      <PostEditor
        editorState={editorState}
        title={title}
        setTitle={setTitle}
        setEditorState={setEditorState}
      />
      <Button variant="primary" disabled={isLoading} size="lg" className="w-50 mt-3 mb-3 mx-auto" onClick={handleSubmit}>Post</Button>
    </Container>
  );
};

export default EditorView;
