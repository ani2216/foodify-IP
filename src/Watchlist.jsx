import { useEffect, useState } from "react";

function Watchlist({image,item,handleWatch,handleDelete}){

	const handleClick = ()=>{
		handleWatch('none');
	}

	return(
		<div className="watch-container" id="watch">
			<div className="nav-bar">
				<img src={image[0]} alt="" id="cross" onClick={handleWatch}/>
				<h1>Your Food List</h1>
				{item.length !==0?
				<div className="food-list">
					{item.map((label,index)=>(
					<div className="list" key={index}>
						<div className="list2">
							<img src={label.image} alt="" />
							<div className="list-detail">
								<img src={image[1]} alt="" id="delete" onClick={()=> handleDelete(label.id)}/>
								<h3>{label.name}</h3>
								<p>{label.rating}</p>
							</div>
						</div>
					</div>
					))}
				</div>
			:<h1 style={{color:'green'}}>NO FOOD ITEMS....</h1>}
			</div>
		</div>
	)

}

export default Watchlist;