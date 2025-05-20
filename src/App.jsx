import './App.css'
import Header from './Header.jsx'
import Image from './Image.jsx'
import image from './assets/Recipe.png'
import image1 from './assets/dish.png'
import search from './assets/search.png'
import location from './assets/location.png'
import Card from './Card.jsx'
import testing from './assets/testing_pic.jpg'
import FoodImage from './FoodImage.jsx'
import ratingimg from './assets/rating.png'
import bookmarkimg from './assets/bookmark.png'
import Blogs from './Blogs.jsx'
import Watchlist from './Watchlist.jsx'
import cross from './assets/cross.png'
import dustbin from './assets/delete.png'
import { useEffect, useState } from 'react'
import FoodImagePart from './FoodImagePart.jsx'
import About from './About.jsx'
import Footer from './Footer.jsx'
import ArrowTop from './ArrowTop.jsx'

function App(){
  const [option,setOption] = useState('');
  const [data, setData] = useState([]);
  
  const [watch,setwatch] = useState("none");

  const handleWatch = (list)=>{
    setwatch(list);
  }

  const [foodClick,setFoodClick] = useState("");

  const handleClicks = (list)=>{
    setFoodClick(list)
  }

  const [watchlistitem,setitem] = useState([]);

  const handleItem = (list)=>{
    setitem(list);
  }

  const handleDelete = (index)=>{
    const listItem = watchlistitem.filter(item=> item.id!==index);
    setitem(listItem);
  }

  const scrollAction = (id)=>{
    const get_id = document.getElementById(id);

    if(get_id){
    get_id.scrollIntoView({behavior:'smooth',block:'start'});
    }

  }

  const url = "https://ani2216.github.io/ani2216/indian_recipe.json";
  // const url = "https://moaluszyypzvmtnbuepv.supabase.co/storage/v1/object/sign/recipe/indian_recipe.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk3NThlNmZlLWNjOTAtNGFiZi1iZDRjLWUwNjA4MzZjNmM4YiJ9.eyJ1cmwiOiJyZWNpcGUvaW5kaWFuX3JlY2lwZS5qc29uIiwiaWF0IjoxNzQ1NDIzNjk3LCJleHAiOjE3NzY5NTk2OTd9.67BI4oKqQ7KTZ_u2cgei4r3X4NRdrYp7EShdcUo7KT4"

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        setData(json);
        console.log("Fetched data:", json);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  useEffect(()=>{
		const temp = [...new Set(data.map(item=>item.cuisine))][0];
		setOption(temp);
	},[data]);



  return (
    <div className="container">
      <ArrowTop />
      <Header scrollSection ={scrollAction}/>
      <Image image = {image}/>
      <Card id="restaurant_sec" image={[testing,ratingimg,bookmarkimg,image1]}/>
      <FoodImage id="dish_sec" handleClicks={handleClicks} options={[option,setOption]} data={data}/>
      {foodClick!==''?<FoodImagePart item={foodClick}/>:null}
      <Blogs id="blog_sec" image = {testing}/>
      <About />
      <Footer id="footer_sec" />
    </div>
  )

}

export default App
