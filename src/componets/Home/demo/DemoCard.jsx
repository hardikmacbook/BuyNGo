import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours24 = time.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  return (

    <>
    <StyledWrapper>
      <div className="watch mt-20 mb-30">
        <div className="belt top" />
        <div className="frame">
          <div className="screen">
            <div className="text">
              <div>{String(hours12).padStart(2, '0')}</div>
              <div>{minutes}</div>
            </div>
            <div className="ampm">{ampm}</div>
          </div>
        </div>
        <div className="belt bottom" />
        <div className="sideBtn">
          <div className="btnLines" />
        </div>
        <div className="powerBtn" />
      </div>
    </StyledWrapper>

    <div className="text-center mb-8">
            <div className="mt-8 flex justify-center">
              <Link
                to="/shop/apple-watch-series-9-gps-45mm-midnight-aluminum"
                className="group border-2 border-gray-200 py-3 px-4 rounded-lg font-medium inline-flex items-center justify-center space-x-2 cursor-pointer text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
              >
                <span>Buy Now</span>
    
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
    </>

    
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  
  .watch {
    position: relative;
    width: 280px;
    height: 350px;
  }

  .belt {
    position: absolute;
    left: 50%;
    width: 80px;
    height: 120px;
    background: linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%);
    transform: translateX(-50%);
    z-index: 1;
  }

  .belt.top {
    top: -115px;
    border-radius: 12px 12px 0 0;
  }

  .belt.bottom {
    bottom: -115px;
    border-radius: 0 0 12px 12px;
  }

  .frame {
    background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
    border-radius: 68px;
    width: 280px;
    height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    padding: 12px;
  }

  .screen {
    background: #000;
    border-radius: 56px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
    position: relative;
  }

  .text {
    color: #fff;
    font-size: 92px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    text-align: center;
    line-height: 0.95;
    text-shadow: 0 0 40px rgba(232, 232, 142, 0.6);
  }

  .ampm {
    color: #fff;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 500;
    margin-top: 10px;
    text-shadow: 0 0 20px rgba(232, 232, 142, 0.5);
    opacity: 0.9;
  }

  .sideBtn {
    position: absolute;
    right: -4px;
    top: 105px;
    background: linear-gradient(90deg, #3a4556 0%, #2d3748 50%, #3a4556 100%);
    border-radius: 0 8px 8px 0;
    width: 10px;
    height: 70px;
    box-shadow: 
      2px 0 8px rgba(0, 0, 0, 0.5),
      inset -1px 0 2px rgba(0, 0, 0, 0.5);
    z-index: 3;
  }

  .btnLines {
    position: absolute;
    top: 50%;
    right: 2px;
    transform: translateY(-50%);
    width: 4px;
    height: 50px;
    background: repeating-linear-gradient(
      to bottom,
      #2a3441 0px,
      #2a3441 2px,
      transparent 2px,
      transparent 4px
    );
  }

  .powerBtn {
    position: absolute;
    right: -4px;
    top: 220px;
    background: linear-gradient(90deg, #3a4556 0%, #2d3748 50%, #3a4556 100%);
    border-radius: 0 8px 8px 0;
    width: 10px;
    height: 70px;
    box-shadow: 
      2px 0 8px rgba(0, 0, 0, 0.5),
      inset -1px 0 2px rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
`;

export default Card;
