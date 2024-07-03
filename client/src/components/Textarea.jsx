import React from 'react'

const Textarea = ({name,labelText,defaultValue=""}) => {
  return (
    <div className='form-control'>
   <label className='label'>
          <span className='label-text capitalize'>{labelText||name}</span>
        </label>

    <textarea
    id={name}
    placeholder={labelText}
    name={name}
    defaultValue={defaultValue}

  className="textarea textarea-bordered textarea-sm w-full min-w-full h-80"></textarea>
   
  </div>
  )
}

export default Textarea