import React from 'react'
import Cards from '../../components/Cards/Cards'
import Pagenation from '../../components/Pagenation/Pagenation'

const Movies = ({movies,setSelected,setModalShow,modalShow,selected ,page ,setPage,HandleAdd  }) => {
  return (
    <div>
        <Cards movies={movies} setModalShow={setModalShow} setSelected={setSelected} modalShow={modalShow} selected={selected} HandleAdd={HandleAdd} />
        <Pagenation page={page} setPage={setPage}/>
    </div>
  )
}

export default Movies