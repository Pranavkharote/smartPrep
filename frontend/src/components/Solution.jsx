import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Solution = () => {
    const question = useOutletContext();
  return (
   <div className="w-full lg:w-1/2 my-10 overflow-y-auto ps-3 p-2">
    <p>{question.title}</p>
    <code className='text-sm bg-gray-100 p-1 rounded'>{question.solution}</code>
   </div>
  )
}

export default Solution