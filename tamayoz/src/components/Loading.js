import React from 'react';
import '../assets/css/App.css';
const Loading = () => {
  return (
    <>
      <div className="loaderContainer">
        <div className="loaderComponent">
          <h1>
            <span className="let1">T</span>
            <span className="let2">A</span>
            <span className="let3">M</span>
            <span className="let4">A</span>
            <span className="let5">Y</span>
            <span className="let6">O</span>
            <span className="let7">Z</span>
          </h1>
          <figure>
            <div className="dot white"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Loading;
