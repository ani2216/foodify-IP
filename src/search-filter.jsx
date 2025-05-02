import { useState } from "react";

function SearchFilter({choice,option}){

	const [activeId, setActiveId] = useState(null);
	const handleChoices = (ele)=>{
		choice(ele);
		setActiveId(ele);
	} 

	return(
			<div className="search_filter">
				<div className="filters">
					<p>Top Filters:</p>
					<ul>
						{option.map((label,key)=>(
							<li className={label.id === activeId ? 'activeLi':null} key={key} onClick={()=>handleChoices(label.id)}>{label.name}</li>
						))}
					</ul>
				</div>
			</div>
	)
}

export default SearchFilter;