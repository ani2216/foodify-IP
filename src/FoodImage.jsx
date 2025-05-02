import { useEffect, useRef, useState } from "react";
import Heading from "./Heading.jsx"
import right from './assets/rightarrow.png'
import left from './assets/leftarrow.png'
import Options from './Options.jsx'
import SearchFilter from "./search-filter.jsx";
import noimg from './assets/no-image.png'

function FoodImage({id,handleClicks,options,data}){

	const [click,setClick] = useState("");

	const [choice,setChoices]= useState(0);
	
	const [recipes, setRecipes] = useState([]);

	const [loading, setLoading] = useState(true); 

	useEffect(() => {
		if (data.length === 0) return;
		setLoading(true);
		setTimeout(() => {
				let filteredRecipes = data.filter(item => item.cuisine === options[0]);

				if (choice === 1) {
      filteredRecipes = filteredRecipes.filter(item => item.diet === 'Vegetarian');
    } else if (choice === 2) {
      filteredRecipes = filteredRecipes.filter(item => item.diet === 'Non Vegeterian');
    } else if (choice === 3) {
      filteredRecipes = filteredRecipes.filter(item => item.diet === 'Eggetarian');
    } else if (choice === 4) {
      filteredRecipes = filteredRecipes.filter(item => {
        return item.time < 15;
      });
    }

				setRecipes(filteredRecipes);
				setLoading(false);  // Data loaded
		}, 1000); // Delay to mimic data fetching
	}, [data,options,choice]);


	const handleClick = (index,name)=>{
		setClick(index);
		handleClicks(name)
	}

	const scrollContainerRef = useRef(null);
  const scrollAmount = 200;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
			const { scrollLeft } = scrollContainerRef.current;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left:scrollAmount, behavior: "smooth" });
      }
    }
	};

	const option = [
		{name:'Veg',id:1},
		{name:'Non-Veg',id:2},
		{name:'Eggetarian',id:3},
		{name:'Cook within 15 min',id:4},
		{name:'Clear Filter',id:0}
	]

	const handleChoices = (ele)=>{
		setChoices(ele);
	}

	return(
		<div className="foodImage" id={id}>
			<Heading heading={"What's on your mind?"} />

			<Options setitem={options[1]} data={data}/>
			<SearchFilter choice={handleChoices} option={option}/>
			 {loading ? (
                <div className="loader">
									<div className="loader-inner"></div>
								</div>
            ) : (
			<>
			<div className="foodimg" ref={scrollContainerRef}>
				{recipes.length === 0 ? (
					<div className="no-match-message">
						<p>No matched recipes found!</p>
					</div>
				) : (
					recipes.map((label, index) => (
						<div className="verticalimg" key={index}>
							<div className="img" onClick={() => handleClick(index, label.recipe_name)}>
								<img
									src={label.image_url && label.image_url.trim() !== "" ? label.image_url : noimg}
									alt=""
									className={`img_pic ${click === index ? "active" : ""}`}
								/>
								<p>{label.recipe_name}</p>
							</div>
						</div>
					))
				)}
			</div>
			<div className="arrow">
				<img src={left} alt="" onClick={()=>scroll("left")}/>
				<img src={right} alt="" onClick={()=>scroll("right")} />
			</div>
			</>
			)}
		</div>
	)
}

export default FoodImage