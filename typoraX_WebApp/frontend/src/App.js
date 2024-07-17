import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MarkdownEditor from './components/MarkdownEditor';
import LivePreview from './components/LivePreview';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [markdownText, setMarkdownText] = React.useState('# Welcome to TyporaX WebApp');

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="editor-preview">
          <MarkdownEditor markdownText={markdownText} setMarkdownText={setMarkdownText} />
          <LivePreview markdownText={markdownText} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

