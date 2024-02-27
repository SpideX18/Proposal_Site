import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const LoveNote = () => {
  const fullText = "Hey beautiful!!!\nIt's been a long time I noticed you, and now I can't wait any longer.\nI had a very hard crush when I saw you for the first time,\nand I would like to ask you something.";
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showQuestionBox, setShowQuestionBox] = useState(false);
  const { name, id } = useParams();
  const [showResponse, setShowResponse] = useState(false);
  const navigate = useNavigate();
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [hoverCount, setHoverCount] = useState(0);
  const [showRejectMessage, setShowRejectMessage] = useState(false);
  const [showFriendshipMessage, setShowFriendshipMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotSureResponse, setShowNotSureResponse] = useState(false);
  

  useEffect(() => {
    if (index < fullText.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(currentText => currentText + fullText.charAt(index));
        setIndex(currentIndex => currentIndex + 1);
      }, 25); // Typing speed
      return () => clearTimeout(timeoutId);
    } else {
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, 1000); // Show the button 5 seconds after typing ends
      return () => clearTimeout(timeout);
    }
  }, [index, fullText.length]);

  useEffect(() => {
    if (showResponse) {
      setTimeout(() => {
        const instagramUrl = `https://instagram.com/${id}`;
        window.open(instagramUrl, '_blank'); // Open in a new tab
      }, 2000); // 10 seconds delay
      return () => clearTimeout(timeoutId);
    }
  }, [showResponse, id]);

  const handleClick = () => {
    setShowButton(false);
    setShowQuestionBox(true);
  };

  const handleYes = () => {
    setShowQuestionBox(false);
    setShowResponse(true);
  };

  if (showResponse) {
    return (
      <div className="container">
        <div className="romantic-box">
          <p>That's great, {name}!<br/>. I'm excited to go on a date with you!</p>
        </div>
      </div>
    );
  }

  const moveNoButton = () => {
    const newPosition = {
      top: `${Math.random() * (window.innerHeight - 50)}px`,
      left: `${Math.random() * (window.innerWidth - 50)}px`,
      position: 'fixed',
    };
    setNoButtonStyle(newPosition);
  };

  const handleNoButtonHover = () => {
    setHoverCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        setShowRejectMessage(true);
      }
      return newCount;
    });
    moveNoButton();
  };

// close site
const handleExit = () => {
  document.body.innerHTML = ''; // This clears the entire content of the body, leaving a blank page
    // Optionally, you can also change the background or add a farewell message before clearing everything
    const messageDiv = document.createElement('div');
  messageDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 30px; font-width:bold; text-align: center;';

  // Set the message text
  messageDiv.innerText = "Sorry girl, you missed the most wonderful man ever in your life.";

  // Append the message div to the body
  document.body.appendChild(messageDiv);
};

const handleNotSure = () => {
  setMessage("Yes, it's too soon to say no!!<br/> Let's try dating, message me.");
  setShowNotSureResponse(true);
  setShowRejectMessage(false);
  setShowQuestionBox(false);
  // setShowInitialMessage(false);

  setTimeout(() => {
    const instagramUrl = `https://instagram.com/${id}`;
    window.open(instagramUrl); // Open in a new tab
  }, 2000);
};



  return (
    <div className="container">
      {showRejectMessage && (
        <div className="romantic-box">
          <p>Are you sure you want to reject me?</p>
          <button type="button" onClick={handleExit} className='no'>Yes I am rejecting you!!!</button>
          <button type="button" onClick={handleNotSure} className='yes'>I am not sure</button>
        </div>
      )}
{/* mojoikoik */}
{showNotSureResponse && (
        <div className="romantic-box">
          <p>{message}</p>
        </div>
      )}

      {showQuestionBox && (
        <div className="romantic-box">
          <p><span>Hey {name}!</span><br/>I think you are very cute. <br/>We could be a really great couple together.<br/>Let's go on a date?</p>
          <div className="response-buttons">
            <button onClick={handleYes} className="romantic-button yes">Yes</button>
            {hoverCount < 5 && (
              <button onMouseEnter={handleNoButtonHover} style={noButtonStyle} className="romantic-button no">No</button>
            )}
          </div>
        </div>
      )}
      {!showQuestionBox && (
        <>
          <div className="typewriter">
            {typedText.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          {showButton && <button onClick={handleClick} className="romantic-button">Question..</button>}
        </>
      )}
    </div>
  );
};

export default LoveNote;
