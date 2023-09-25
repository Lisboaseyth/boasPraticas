
import { useEffect, useState } from 'react'
import './App.css'
import { API } from './service'

function App() {

  const [chars, setChars] = useState([])
  const [page, setPage] = useState(1)

  const nextPage = () => {
    setPage(page + 1)
    
  }
  
  const previousPage = () => {
    page > 1 ? setPage(page - 1) : null
  }

  const requestApi = async () => {
    
    try {
      
      const resp = await API.get(`/character/?page=${page}`)
      setChars(resp.data.results)

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    requestApi()
  }, [page])

  return (
    <>
      {
        chars.map((person: any, index) => (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}} key={index}>
            <img src={person.image} alt="Img person" />
            <div>
              <h2>{person.name}</h2>
              <p>{person.status}</p>
            </div>
          </div>
        ))
      }
      <button onClick={() => previousPage()}>Previous</button>
      <button onClick={() => nextPage()}>Next</button>
    </>
  )
}

export default App
