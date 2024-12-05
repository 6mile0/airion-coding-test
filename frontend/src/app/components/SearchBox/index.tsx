import React from 'react';
import { SearchIcon } from '../SearchIcon';

export const SearchBox = () => {
    return (
        <div className='flex items-center justify-center w-full h-12 px-3 bg-white border rounded-lg'>
            <SearchIcon className='text-sm font-bold' width={35} height={35} />
            <input className='w-full h-10 px-3 text-base placeholder-gray-600rounded-lg focus:shadow-outline' type='text' placeholder='タスクを検索' />
        </div>
    );
};

