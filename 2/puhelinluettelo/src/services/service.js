import axios from 'axios'
const url = 'http://localhost:3001/persons'
const fetchAll = () => {
  const req =  axios.get(url)
  return req.then(res => res.data)

}
const create = nameObject => {
    const req = axios.post(url, nameObject)
    return req.then(res =>{return res.data})


}
const rem = id => {
        // Whatever you want to do with that item
     const req =   axios.delete(`${url}/${id}`)
        return req.then(resp => resp.data)
    
}
const edit = (id, newObj) => {
  const req = axios.put(`${url}/${id}`, newObj)
  return req.then(resp => resp.data)

}
export default {
    fetchAll,
    create,
    rem,
    edit
}