import right from './assets/right-arrow.png'
import left from './assets/left-arrow.png'
import { useEffect, useRef, useState } from 'react'

function Option({setitem,data}){
	
	const [cuisine,setCuisine] = useState([]);
	
	useEffect(()=>{
		const temp = [...new Set(data.map(item=>item.cuisine))];
		setCuisine(temp);
	},[data]);

	const [active,setActive] = useState(0);

	const handleClick = (item,label)=>{
		setActive(item===active?null:item)
		setitem(label);
	}

	const scrollContainerRef = useRef(null);
  const scrollAmount = 100;

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

	return(
		<div className="option-container">
				<ul ref={scrollContainerRef}>
					{cuisine.map((label,index)=>(
					<li key={index} className={`${active===index?'active':''}`} onClick={()=> handleClick(index,label)}>{label}</li>
					))}
				</ul>
				<div className="arrow-image">
						<img src={left} alt="" className='left' onClick={()=>scroll('left')}/>
						<img src={right} alt="" className='right' onClick={()=>scroll('right')}/>
				</div>
		</div>
	)

}

export default Option