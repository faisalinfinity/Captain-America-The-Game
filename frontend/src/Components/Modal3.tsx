import React, { FC, ReactNode,useState } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  res:boolean
}

 
const Modal3: FC<ModalProps> = ({ open, onClose,res }) => {
 // const [res,setRes]=useState(true)
  let win="https://media3.giphy.com/media/xULW8CPwOHXPua8NTa/giphy.gif?cid=6c09b952443dae5e32cb2c06785e4b487ea9d3f23d4ba6d6&rid=giphy.gif&ct=g"
  let lose="https://gifdb.com/images/high/you-re-a-loser-danopantin-vahtf4lrbd4e32ux.gif"
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div onClick={(e)=>e.stopPropagation()} className={`${res? `bg-[url('https://media3.giphy.com/media/xULW8CPwOHXPua8NTa/giphy.gif?cid=6c09b952443dae5e32cb2c06785e4b487ea9d3f23d4ba6d6&rid=giphy.gif&ct=g')]`:`bg-[url('https://thumbs.gfycat.com/ImpossibleQuickBarnacle-max-1mb.gif')]`}  rounded-xl  shadow p-60  transition-all
      ${open?"scale-100 opacity-100 ":"scale-125 opacity-0"}`}>
       <div className='text-center w-100'>
        <div className='mx-auto my-4 w-48'>
          hello this is text
        </div>
       </div>
       <div className='flex gap-4'>
       <button
                  // onClick={toggleModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500   "
                >
                  Game Over
                </button>
       </div>
  
      </div>
    
    </div>
  );
};

export default Modal3;
