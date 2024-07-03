import React from 'react'

const CheckboxInput = ({name,label,onChange,defaultValue}) => {
 
  return (
    <div className='form-control'>
<div className='flex items-center space-x-2'>
     <input type="checkbox"  className="checkbox" id={name} name={name}  onChange={onChange} defaultChecked={defaultValue===true?true:false}/>
      <label
        htmlFor={name}
        className='text-sm leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        
      >
        {label}
      </label>
    </div>
    </div>
  )
}

export default CheckboxInput