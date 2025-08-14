import axios from 'axios';
import { useState } from 'react'

const Joke = ({showMessage}) => {
    const [joke, setJoke] = useState("Click the button to generate a joke!")
    const [loading, setLoading] = useState(false);

    const fetchJoke = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/joke`);
      setJoke(res.data.text);
    } catch (error) {
      setJoke("Failed to fetch joke. Please try again!");
    }finally{
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joke);
    showMessage();
  };

 


  return (
    <div className='p-10 items-center mt-20 lg:mt-5 flex flex-col gap-10 rounded-3xl shadow-2xl border-t-6 border-gray-600 mx-auto w-3/4 md:w-1/2'>
      <h1 className='text-white/70 text-xl md:text-3xl font-bold mx-auto py-2 px-3 border-gray-600 rounded-3xl border-r-4 border-l-4'>
        Joke Generator
      </h1> 
      <div className='w-full h-48 md:h-32 bg-white/10  p-4 rounded-3xl text-white/70 flex items-center justify-center'>
      <button className=' cursor-pointer' onClick={copyToClipboard}>
      {loading ? 'Generating joke...' : joke}
      </button>
      </div>
        <button className='px-3 rounded-3xl border-b-2 border-t-2 border-gray-600 hover:scale-105 duration-300 py-2 cursor-pointer text-white/70 shadow-2xl flex mx-auto' onClick={fetchJoke}>
          Generate Joke
        </button>
      </div>
  )
}

export default Joke
