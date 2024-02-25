import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

import './App.css';

type TConfig = {
  readonly: boolean;
  placeholder: string;
};

function App() {
  const [value, setValue] = useState('');
  const [data, setData] = useState<string>('');
  const editor = useRef<any>();

  function sendData() {
    fetch('/page', { method: 'POST', body: value });
  }

  function downloadData() {
    fetch('/page')
      .then((response) => response.text())
      .then((data) => setData(data));
  }

  const config = useMemo<TConfig>(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Start typings...',
    }),
    []
  );

  return (
    <div>
      <div className="editor">
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          onBlur={(newContent) => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
        />
        <button onClick={sendData}> Отправить </button>
        <button onClick={downloadData}> Получить </button>
      </div>
      <div className="container" dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
}

export default App;
