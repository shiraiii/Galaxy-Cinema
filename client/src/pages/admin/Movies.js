import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const Movies = () => {
    const {id} = useParams()

    const[data, setData] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/movie')
        .then(res => {
            console.log(res);
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/api/movie/delete/' + id)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='flex h-full bg-red-500 justify-center items-center'>
        <div className='w-full bg-white rounded p-3'>
            <Link to = "/admin/movie/create" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Add +  
            </Link>
            <Link to = "/admin" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4'>
                Back
            </Link>
            <table className='table w-full table--users mt-2'>
                <thead>
                    <tr className='w-auto'>
                        <th className='text-left'>moiveName</th>
                        <th className='text-left'>movieImg</th>
                        <th className='text-left'>Moive Rating</th>
                        <th className='text-left'>Age Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((movie, index)=>{
                            return <tr key={index}>
                                <td >{movie.movieName}</td>
                                <td ><img className='w-[100px]' src={movie.movieImg}></img></td>
                                <td >{movie.movieRating}</td>
                                <td >{movie.ageLimit}</td>
                                <td >
                                    <Link to={`/admin/movie/update/${movie._id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update</Link>
                                    <button onClick={() => handleDelete(movie._id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button> 
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

export default Movies