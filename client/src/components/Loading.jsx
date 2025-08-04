import React from 'react';

const Loading = () => {
  return (
    <main
      className="w-100 d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // subtle overlay
      }}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </main>
  );
};

export default Loading;
