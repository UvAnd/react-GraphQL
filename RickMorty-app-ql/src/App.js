import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_CHARACTERS } from './queries'
import Card from './Card'

const App = () => {
  const [page, setPage] = useState(1)
  const [nameFilter, setNameFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isRefetching, setIsRefetching] = useState(false)
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page, filter: { name: nameFilter, status: statusFilter } },
    onCompleted: () => setIsRefetching(false)
  })

  if (loading && !isRefetching) return <p>Loading...</p>
  if (error) return <p>Error {error.message}</p>

  const totalPages = data?.characters?.info?.pages

  return (
    <>
      <header>
        <h1 className="text-center m-5">Rick and Morty GraphQL App</h1>
      </header>
      <div className="d-flex justify-content-center my-3">
        <input type="text" className="form-control mx-2" placeholder="Filter by name" value={nameFilter} onChange={e => {setIsRefetching(true); setNameFilter(e.target.value)}} />
        <input type="text" className="form-control mx-2" placeholder="Filter by status" value={statusFilter} onChange={e => {setIsRefetching(true); setStatusFilter(e.target.value)}} />
      </div>
      {isRefetching ? <p className="text-center">Refetching...</p> : 
      <div>
      <div className="row">
        {data?.characters?.results.length > 0 ? data?.characters?.results.map(character =>
          <Card character={character} key={character.id} />
        ) : <p>No results found</p>}
      </div>
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-primary mx-2" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Previous</button>
        <button className="btn btn-primary mx-2" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
      </div>
      }
    </>
  )
}

export default App