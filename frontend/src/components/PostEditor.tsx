import React from 'react';
import { Form } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

interface PropTypes {
  title?: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  editorState?: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const defaultProps = {
  title: '',
  editorState: EditorState.createEmpty()
};

const PostEditor = ({
  title, setTitle, editorState, setEditorState
}: PropTypes) => (
  <div>
    <Form onSubmit={(e) => {
      e.preventDefault();
    }}
    >
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
      </Form.Group>
    </Form>
    <Editor
      editorClassName="editor"
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={{
        options: ['inline', 'blockType', 'link', 'image'],
        inline: {
          options: ['bold', 'italic']
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'Code']
        }
      }}
    />
  </div>
);

PostEditor.defaultProps = defaultProps;

export default PostEditor;
