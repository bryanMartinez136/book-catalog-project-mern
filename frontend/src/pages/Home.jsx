import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfo, BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => {
    //state for books with a default val of empty arr
    const [books, setBooks] = useState([])
    // loading state with defualt value of flase. 
    const[loading, setLoading] = useState([false])
    useEffect(() => {
        //use the loading state
        setLoading(true); 

        //fetch data
        axios.get(
            'http://localhost:5555/books'
        ).then( (response)=>{
            //response dot data is the object of the response
            //result, and in that we have content data. 
            setBooks(response.data.data); 
            setLoading(false)
        })
        .catch( (error)=>{
            console.log(error); 
            setLoading(false)
        })

    }, []); 
  return (
    <div className='p-4'>
        <div className='flex justify-between item-center'>
            <h1 className='text-3x1 my-8'>Books List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4x1'/>
            </Link>
        </div>

        {/* check if in loading state or not */}
        {loading ? (
            // fi truee, return spinner component
            <Spinner/>
        ) : (
            // otherewise return a table
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Title</th>
                        {/* the author and publish year will be hidden for smaller sized screens */}
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>

                        

                    </tr>

                </thead>
                <tbody>
                    {books.map((book, index)=>{
                        <tr key={book._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {book.title}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {book.author}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {book.publishYear}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className='text-2x1 text-green-800'/>
                                    </Link>
                                    <Link to= {`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className='text-2x1 text-yellow-600'/>
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}>
                                        <MdOutlineDelete className='text-2x1 text-red-600' />
                                    </Link>

                                </div>
                            </td>

                        </tr>

                    })}
                </tbody>

            </table>
        )}
    </div>
  )
}

export default Home