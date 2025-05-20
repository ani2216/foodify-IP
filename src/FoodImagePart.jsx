import { useState,useRef,useEffect } from 'react';
import veg from './assets/veg.png'
import nonveg from './assets/nonveg.png'
import cuisine from './assets/cuisine.png'
import user from './assets/user-avatar.png'
import time from './assets/time.png'
import youtube from './assets/youtube.png'


function FoodImagePart({item}){

	const [data, setData] = useState([]);
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

	const recipes = data.filter(ele => ele.recipe_name===item);

	const scrollContainerRef = useRef(null);
  const scrollAmount = 320;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left:scrollAmount, behavior: "smooth" });
      }
    }
	};

	return(
		<div className="food-container">

			{recipes.map((l,index)=>(
			<div className="recipe">
				<h2>Recipe of {l.recipe_name}</h2>
				<div className="recipe-detail">
				<div className="recipe-item">
					<h3>Ingredients Used:</h3>
				<div className="ingredient">
					{l.Ingredients
					.split(',')
					.filter(step => step.trim() !== '') // Avoid empty steps
					.map((step, idx) => (
							<li key={idx} style={{fontSize:'1rem',lineHeight:'1.8',color:'rgb(53,53,53)'}}>{step.trim()}.</li>
					))}
				</div>
			</div>
			<div className="recipe-detail-inner">
				<h3>Details:</h3>
				<div className="ingredient detail-recipe">
					<div className="detail-grid">
						<div className="det">
							<img src={time} alt="" />
							<p>{l.time} min</p>
						</div>
						<div className="det">
							<img src={user} alt="" />
							<p>{l.serve} persons</p>
						</div>
						<div className="det">
							<img src={cuisine} alt="" />
							<p>{l.cuisine}</p>
						</div>
						<div className="det">
							<img src={l.diet==='Vegetarian'?veg:nonveg} alt={l.diet} />
							<p>{l.diet}</p>
						</div>
					</div>
				</div>
			</div>
			</div>

			<div className="youtube">
				<h3>Available Links:</h3>
				<a href={l.video_url} target='_blank' title={l.video_url}><img src={youtube} alt="" /></a>
			</div>

			<div className="description">
				<h3>Description:</h3>
				 {l.instruction
					.split('.')
					.filter(step => step.trim() !== '') // Avoid empty steps
					.map((step, idx) => (
							<li key={idx} style={{fontSize:'1rem',lineHeight:'1.8',color:'rgb(53,53,53)'}}>{step.replace(/\ufffd/g, '').trim()}.</li>
					))}
			</div>

		</div>
			))}

		</div>
	)
}

export default FoodImagePart;
