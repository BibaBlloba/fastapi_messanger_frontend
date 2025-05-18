import React, { useState } from 'react';

const InputField = ({ onClick }) => {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    if (inputValue.trim()) {
      onClick(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="w-full flex items-center gap-2 mx-auto">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type text..."
        className="flex-1 bg-[#2A2A2A] text-white rounded-lg px-4 py-2 focus:outline-none"
        autoFocus
      />
      <button
        className="bg-[#5E35B1] text-white rounded-full p-2"
        onClick={handleClick}
      >
        <p>₍^. .^₎⟆</p>
      </button>
    </div>
  );
};

export default InputField;
