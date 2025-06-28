import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Solution = () => {
    const question = useOutletContext();
  return (
   <div className=" lg:w-1/2 my-10 overflow-y-auto ps-3 h-200  p-2">
    <p>{question.title}</p>
    <code className='text-sm  p-3  rounded'>{question.solution}</code>
 {question.youtubeSolutionURL && (
  <video src={question.youtubeSolutionURL} controls />
)}

   </div>
  )
}

export default Solution