import React, { useEffect, useState } from 'react'

const ImageInput = ({labelText,name,image=""}) => {

    const[photo,setPhoto]=useState(null)
    const[img,setImg]=useState(image)

const handleChange=(e)=>{
  setPhoto(e.target.files[0])
  setImg(null)
}

  return (
    <div className='form-control'>
    <label className='label'>
           <span className='label-text capitalize  font-semibold'>{labelText||name}</span>
         </label>
<div className='flex'>
         <input type="file" className="file-input w-full max-w-xs" name={name} id={name} accept='image/*' onChange={(e)=>handleChange(e)}/>

         {photo && (
            <img
              src={URL.createObjectURL(photo) ||image}
              alt=" photo"
              style={{ maxWidth: "180px" }}
            />
          )}


          {img && (
            <img
              src={image}
              alt=" photo"
              style={{ maxWidth: "180px" }}
            />


          )}  
       
          </div>
 </div>
  )
}

export default ImageInput