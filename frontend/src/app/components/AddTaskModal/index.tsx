import React from 'react';
import AddButton from '../Buttons/Add';

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  modalTitle: string;
  submitBtnTitle: string;
  setTile: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

export const MessageDialog = ({open, onCancel, onSubmit, setTile, setDescription, modalTitle, submitBtnTitle}: ModalProps) => {
  return open && (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => onCancel()}></div>
      <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-80 p-5 flex flex-col items-start fixed z-20 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-5">{modalTitle}</h1>

        <label className='text-md mb-1'>タイトル</label>
        <input
          className='w-full h-10 border border-gray-300 rounded-md mb-5 px-3'
          placeholder='買い物'
          onChange={(e) => setTile(e.target.value)}
        />

        <label className='text-md mb-1'>詳細</label>
        <textarea
          className='w-full h-20 border border-gray-300 rounded-md mb-5 px-3'
          placeholder='牛乳を買う'
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end w-full">
          <AddButton title={submitBtnTitle} onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};
