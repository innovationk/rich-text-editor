// import { useState } from 'react'
import { RichTextEditor, RichTextVisualiser } from '@devguild/rich-text-editor';

function App() {

    return (
        <div id="app">
            <h1>
                Rich Text
            </h1>

            <h2>Editor</h2>
            <div>
                <RichTextEditor />
            </div>

            <h2>Visualiser</h2>
            <div>
                <RichTextVisualiser />
            </div>
        </div>
    )
}
export default App;