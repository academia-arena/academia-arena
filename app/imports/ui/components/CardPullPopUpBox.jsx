import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// code by GeeksforGeeks 'How-to-create-Pop-Up-Box'
const CardPullPopUpBox = () => {
  return (
    <div>
      <Popup trigger=
               {<button> Click to open modal </button>}
             modal nested>
        {
          close => (
            <div className='modal'>
              <div className='content'>
                Check your collection to see your new card!
              </div>
              <div>
                <button onClick=
                          {() => close()}>
                  CLOSE
                </button>
              </div>
            </div>
          )
        }
      </Popup>
    </div>
  );
};

export default CardPullPopUpBox;