import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const {id} = useParams()

    const[data, setData] = useState([])

    const navigate = useNavigate()

    const filterSort = data.filter((a) => a.id === id).sort((a, b) => a.roles > b.roles ? 1:-1)
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/user')
        .then(res => {
            console.log(res);
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/api/user/delete/' + id)
        .then(res => {
            console.log(res)
            navigate('/admin/user')
        })
        .catch(err => console.log(err))
    }

    const refreshPage = () => {
        window.location.reload(false);
    }
  return (
    <div className='flex h-full bg-red-500 justify-center items-center'>
        <div className='w-full bg-white rounded p-3'>
            <Link to = "/admin/create" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Add +  
            </Link>
            <Link to = "/admin" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4'>
                Back
            </Link>
            <table className='table w-full table--users mt-2'>
                <thead>
                    <tr className='w-auto'>
                        <th className='text-left'>Name</th>
                        <th className='text-left'>Email</th>
                        <th className='text-left'>Phone</th>
                        <th className='text-left'>Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterSort.map((user, index)=>{
                            return <tr key={index}>
                                <td >{user.name}</td>
                                <td >{user.email}</td>
                                <td >{user.phone}</td>
                                <td >{user.roles}</td>
                                <td >
                                    <Link to={`/admin/update/${user._id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update</Link>
                                    <button type='button' onClick={() => {handleDelete(user._id), refreshPage()}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button> 
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users