import React from "react";

const Error = ({ title, message }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
};

export default Error;
