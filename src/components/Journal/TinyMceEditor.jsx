
import { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCEEditor({ value, onEditorChange, disabled }) {
  const editorRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (editorRef.current && value === '') {
      editorRef.current.setContent('');
    }
  }, [value]);

  return (
    <div className="w-full">
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={value}
        onEditorChange={(content, editor) => {
          if (content === '<p><br data-mce-bogus="1"></p>') {
            editor.setContent('');
            onEditorChange('');
          } else {
            onEditorChange(content);
          }
        }}
        disabled={disabled}
        init={{
          directionality: 'ltr',
          plugins: 'wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          setup: (editor) => {
            editor.on('focus', (e) => {
              if (editor.getContent() === '') {
                editor.setContent('');
              }
            });
          },
          height: 400,
          menubar: false,
          branding: false,
          statusbar: true,
          resize: true,
        }}
        className="w-full"
      />
    </div>
  );
}
