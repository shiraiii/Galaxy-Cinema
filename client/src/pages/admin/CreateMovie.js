import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const CreateMovie = () => {
  const[movieName, setMovieName] = useState()

  const[movieImg, setMovieImg] = useState()

  const[movieRating, setMovieRating] = useState()

  const[ageLimit, setAgeLimit] = useState()


  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:5000/api/createMovie',{movieName,movieImg,movieRating,ageLimit})
    .then(res => {
      console.log(res)
      navigate('/admin')
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='flex h-auto justify-center items-center'>
        <div className='w-full bg-white rounded p-3'>
            <form onSubmit={handleSubmit} className='mb-3'>
                <h2>Add Movie</h2>
                <label htmlFor='movieName' className='text-xs block font-bold not-italic text-[#777777]'>Tên phim</label>
                <span className='w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300'>
                    <input autoComplete='true' type='text' id='movieName' placeholder='Nhập tên phim' className='bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2' name='movieName' onChange={(e) => setMovieName(e.target.value)} ></input>
                </span>
                <label htmlFor='movieImg' className='text-xs block font-bold not-italic text-[#777777]'>Ảnh Phim</label>
                <span className='w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300'>
                    <input required autoComplete='true' type='text' id='movieImg' placeholder='Ảnh phim' className='bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2' name='movieImg' onChange={(e) => setMovieImg(e.target.value)}></input>
                </span>
                <label htmlFor='movieRating' className='text-xs block font-bold not-italic text-[#777777]'>Đánh giá</label>
                <span className='w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300'>
                    <input required autoComplete='true' type='text' id='movieRating' placeholder='Nhập đánh giá' className='bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2' name='movieRating' onChange={(e) => setMovieRating(e.target.value)}></input>
                </span>
                <label htmlFor='ageLimit' className='text-xs block font-bold not-italic text-[#777777]'>
                    Độ tuổi
                </label>
                <span className='w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300'>
                    <input 
                    required 
                    autoComplete='false' 
                    type='text' 
                    id='ageLimit' 
                    placeholder='Nhập độ tuổi' 
                    className='bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2' 
                    name='ageLimit' 
                    onChange={(e) => setAgeLimit(e.target.value)}
                    >

                    </input>
                </span>
                <button className='bg-blue-500 text-white rounded px-2 py-1'>Thêm</button>
            </form>
            <Link to={'/admin'} className='bg-red-500 text-white rounded px-3 py-1'>Back</Link>
        </div>
    </div>
  )
}

export default CreateMovie