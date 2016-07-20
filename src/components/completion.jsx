import React from 'react';

export default({completion, selected}) => {
  return (
      <div style={{
        // TODO: improve style
        backgroundColor: selected ? 'lightblue' : 'white'
      }}>
        {completion}
      </div>
  );
};