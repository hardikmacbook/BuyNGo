import React from 'react';
import styled from 'styled-components';

const Button = ({ label = "Button" }) => {
  return (
    <StyledWrapper>
      <button>
        {label}
        <div className="star-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C579.12 378.41 415.94 210.08 392.05 0z" /></svg>
        </div>
        <div className="star-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C579.12 378.41 415.94 210.08 392.05 0z" /></svg>
        </div>
        <div className="star-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C579.12 378.41 415.94 210.08 392.05 0z" /></svg>
        </div>
        <div className="star-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C579.12 378.41 415.94 210.08 392.05 0z" /></svg>
        </div>
        <div className="star-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C579.12 378.41 415.94 210.08 392.05 0z" /></svg>
        </div>
        <div className="star-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C579.12 378.41 415.94 210.08 392.05 0z" /></svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    padding: 4px 25px;
    background: #fec195;
    font-size: 17px;
    font-weight: 500;
    color: #181818;
    border: 3px solid #fec195;
    border-radius: 8px;
    box-shadow: 0 0 0 #fec1958c;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  .fil0 { fill: #000; }

  .star-1, .star-2, .star-3, .star-4, .star-5, .star-6 {
    position: absolute;
    filter: drop-shadow(0 0 0 #fffdef);
    z-index: -5;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-1 { top: 20%; left: 20%; width: 25px; }
  .star-2 { top: 45%; left: 45%; width: 15px; }
  .star-3 { top: 40%; left: 40%; width: 5px; }
  .star-4 { top: 20%; left: 40%; width: 8px; transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01); }
  .star-5 { top: 25%; left: 45%; width: 15px; transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01); }
  .star-6 { top: 5%; left: 50%; width: 5px; transition: all 0.8s ease; }

  button:hover {
    background: transparent;
    color: #000;
    box-shadow: 0 0 25px #fec1958c;
  }

  button:hover .star-1 { top: -80%; left: -30%; filter: drop-shadow(0 0 10px #fffdef); z-index: 2; }
  button:hover .star-2 { top: -25%; left: 10%; filter: drop-shadow(0 0 10px #fffdef); z-index: 2; }
  button:hover .star-3 { top: 55%; left: 25%; filter: drop-shadow(0 0 10px #fffdef); z-index: 2; }
  button:hover .star-4 { top: 30%; left: 80%; filter: drop-shadow(0 0 10px #fffdef); z-index: 2; }
  button:hover .star-5 { top: 25%; left: 115%; filter: drop-shadow(0 0 10px #fffdef); z-index: 2; }
  button:hover .star-6 { top: 5%; left: 60%; filter: drop-shadow(0 0 10px #fffdef); z-index: 2; }
`;

export default Button;
