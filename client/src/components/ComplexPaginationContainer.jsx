import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const ComplexPaginationContainer = () => {

  const{currentPage,numOfPages}=useLoaderData()

  const pages=Array.from({length:numOfPages},(_,index)=>{
    return index+1
  })

  const{search,pathname}=useLocation()
  
  const navigate=useNavigate()

  const hadlePageNumber=(pageNumber)=>{
    
    const searchParams=new URLSearchParams(search)
    
    searchParams.set('page',pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)

    
   
    }
    if(numOfPages<2){
      return null
        }
  
  return (
    <div className='mt-16 flex justify-end'>

<div className="join">
  <button className='btn btn-xs sm:btn-md join-item' onClick={()=>hadlePageNumber(1)}>
Prev
  </button>
{pages.map((page)=>{
return(
  <button className={`btn btn-xs md:btn-md join-item ${page === currentPage ?' bg-base-300 border-base-300':''}`}  key={page} onClick={()=>hadlePageNumber(page)}>
  {page}
  </button>
)
})}
  <button className='btn btn-xs sm:btn-md join-item' onClick={()=>hadlePageNumber(1)}>
Next
  </button>
</div>
 </div>
  )
}

export default ComplexPaginationContainer