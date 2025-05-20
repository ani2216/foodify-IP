import Heading from "./Heading.jsx";
import BlogSection from "./BlogSection.jsx";
import { useEffect, useRef, useState } from "react";
import right from './assets/rightarrow.png'
import left from './assets/leftarrow.png'

function Blogs({id}){

	const[getIndex,setIndex] = useState("");
	const [result, setResult] = useState(null);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

  // const url = "https://moaluszyypzvmtnbuepv.supabase.co/storage/v1/object/sign/blogs/data.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2VjNjJjZGUwLTE3NTEtNDllYy05MWI5LTZmODVjNTllMjEwZSJ9.eyJ1cmwiOiJibG9ncy9kYXRhLmpzb24iLCJpYXQiOjE3NDYxODQ2ODgsImV4cCI6MTc3NzcyMDY4OH0.Wpt6hHFw5Td9nFcQV_lFjrpqeAS8ftSZtEsHOjdn2rY";
const url = "https://ani2216.github.io/ani2216/data.json";
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        setData(json);
        console.log("Fetched data:", json);
				setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
				setLoading(false);
      });
  }, []);

	const btn_visible = (name)=>{
		var div_class = document.getElementById('blog_container');
		setIndex(name);
		div_class.style.display = "flex";
	}

	useEffect(() => {
    if (getIndex) {
        const foundItem = data.find(item => item.heading === getIndex);
        setResult(foundItem || null);
    }
}, [getIndex]);


	const btn_hide = ()=>{
		var div_class = document.getElementById('blog_container');

		div_class.style.display = "none";
	}

	const scrollContainerRef = useRef(null);
  var scrollAmount = 370;

	if(window.innerWidth <=601 && window.innerWidth>=480){
		scrollAmount = 400;
	}  else{
		scrollAmount=330;
	}

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

	const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
		};

		if (loading) {
		return (
			<div className="loader">
				<p>Loading Blogs...</p>
			</div>
		);
	}

	return (
		<div className="blog-container" id={id}>
			<div className="blog_container1" id="blog_container">
			<div className="blog_part">
				<img src={result?.image_url} alt="" />
				<h1>{result?.heading}</h1>
				<div className="blog_detail">
					<p>BY: {result?.author_name}</p>
					<p>Date: {result?.date_of_post}</p>
				</div>
				<p>{result?.description}</p>
				<div className="btn_blog">
					<button onClick={btn_hide}>Close</button>
				</div>
			</div>
		</div>

			<Heading heading={"Blogs"} />			

			<div className="blog-card" ref={scrollContainerRef}>
				{shuffleArray(data).map((label,index)=>(
				<div className="blog-card-section" key={index}>
					<img src={label.image_url} alt="Blog's Image" />
					<h3>{label.heading}</h3>
					<p id="para">{label.description.slice(0,125)}...</p>
					<a onClick={()=>btn_visible(label.heading)}>READ MORE</a>
				</div>
				))}
			</div>

			<div className="arrow">
				<img src={left} alt="" onClick={()=> scroll("left")}/>
				<img src={right} alt="" onClick={()=> scroll('right')}/>
			</div>
			
		</div>
	)

}

export default Blogs;
