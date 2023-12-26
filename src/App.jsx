import { useState, useEffect } from 'react'
import axios from 'axios'
import Catdtl from './Catdtl.jsx'

function App() {
  const [ctgAry, setCtgAry] = useState([])
  const [ctgObj, setCtgObj] = useState("")
  const [newCat, setNewCat] = useState("")
  const [newName, setNewName] = useState("")

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories`)
      .then(response => {
        setCtgAry(response.data)
      })
  }, [])

  const delOp = (id) => {
    const delid = id
    axios.delete(`http://localhost:8000/api/categories/${delid}`)
      .then(response => {
        console.log(response.data)
        console.log("del success")
        setCtgAry(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }

  const dtlOp = (id) => {
    const catid = id
    axios
      .get(`http://localhost:8000/api/categories/${catid}`)
      .then(response => {
        setCtgObj(response.data)
      })
  }

  const addCat = (event) => {
    event.preventDefault()
    const newCatName = newCat
    axios
      .post(`http://localhost:8000/api/categories?name=${newCatName}`)
      .then(response => {
        console.log("succ add new cat")
        console.log(response)
        setCtgAry(response.data)
      })
    setNewCat("")
  }

  const handleCat = (event) => {
    //console.log(event.target.value)
    setNewCat(event.target.value)
  }

  const handleNamebox = (event) => {
    console.log("bb")
    setNewName(event.target.value)
    console.log(newName)
  }

  const updOp = (id) => {
    const updid = id
    axios
      .put(`http://localhost:8000/api/categories/${updid}`, { name: newName })
      .then(response => {
        console.log("succ updated")
        console.log(response)
        setCtgAry(response.data)
      })
    setNewName("")
  }

  return (
    <>
      <h3>Categories</h3>
      <ul>
        {ctgAry.map(ctg =>
          <li key={ctg.id} > {ctg.name}
            <button onClick={() => delOp(ctg.id)}>delete</button>
            <button onClick={() => dtlOp(ctg.id)}>detail</button>
            <textarea onChange={handleNamebox} />
            <button onClick={() => updOp(ctg.id)}>update</button>
          </li>
        )}
      </ul >
      <div>
        <Catdtl id={ctgObj.id} name={ctgObj.name} cr={ctgObj.created_at} />
      </div>
      <h3>Add new Category</h3>
      <form onSubmit={addCat}>
        <input value={newCat} onChange={handleCat} />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
