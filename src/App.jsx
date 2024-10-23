import { useEffect, useState } from 'react'
import Main from './components/Main'
import SideBar from './components/SideBar'
import Footer from './components/Footer'

function App() {
  const [showModel,setShowModel]=useState(false);
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);

  const handelShowModel=()=>{
    setShowModel(!showModel);
  }

  useEffect(() => {
    const fetchApiData = async () => {
      const API_KEY = import.meta.env.VITE_NASA_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

      const today=(new Date()).toDateString();
      const localKey=`NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear();

      try {
        const response = await fetch(url);
        const apiData = await response.json();
        console.log("fetched from api");
        localStorage.setItem(localKey,JSON.stringify(apiData));
        setData(apiData);

      } catch (err) {
        console.log(err.message);
      }
    };

    fetchApiData();
  }, []);

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}

      {showModel && (<SideBar handelShowModel={handelShowModel} data={data} />)}

      {data && (<Footer handelShowModel={handelShowModel} data={data} />)}
    </>
  )
}

export default App
