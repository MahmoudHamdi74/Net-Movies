import React from 'react'
import Pagination from "react-bootstrap/Pagination";



const Pagenation = ({page,setPage}) => {
  return (
    <div className="Pagination">

        <Pagination style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}} >
      <Pagination.First onClick={()=> setPage(1)} disabled={page===1} />
      <Pagination.Prev onClick={()=> setPage(page-1)} disabled={page===1} />
      <Pagination.Item >{page}</Pagination.Item>
      <Pagination.Next onClick={()=> setPage(page+1)} disabled={page===500} />
      <Pagination.Last onClick={()=> setPage(500)} disabled={page===500} />
    </Pagination>
      </div>
  )
}

export default Pagenation