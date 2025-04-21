import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PongBackground from './components/PongBackground.jsx';

const App = () => {
  return (
    <>
      <PongBackground />
    </>
  );
};


ReactDOM.createRoot(document.getElementById('pong-root')).render(
  <React.StrictMode>
    <PongBackground />
    {/* <Routes>
        <Route path="/" element={<Home />} />
    </Routes> */}
  </React.StrictMode>
);
