import { useState,useEffect } from 'react';
import Heading from './Heading.jsx'
import directionlogo from './assets/directionlogo.png'
import user from './assets/user.png'
import rating from './assets/rating.png'
import CardSearch from './CardSearch.jsx';
import SearchFilter from './search-filter.jsx';

function Card({id,image}){


	const [getCity,city] = useState("");
	const [choices,setChoices] = useState(0);
	const [filter_restaurant, setFilterRestaurant] = useState([]);
	const [loading, setLoading] = useState(true);

  const baseUrl = "https://ani2216.github.io/ani2216/";
  const fileCount = 15;
  const fileUrls = Array.from({ length: fileCount }, (_, i) => `${baseUrl}chunk_${i + 1}.json`);

const success = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  const getUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;

  fetch(getUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.city) {
        city(data.city.toLowerCase());
      } else {
        city("delhi"); // fallback if city not found
      }
    })
    .catch(() => {
      city("delhi");
    });
};

const error = () => {
  city("delhi");
};

// Call it
navigator.geolocation.getCurrentPosition(success, error);

	const loadAndFilterData = async () => {
    const allRestaurants = [];
		setLoading(true);
    await Promise.all(
      fileUrls.map(async (url) => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          allRestaurants.push(...data); // assuming each chunk is an array of restaurant objects
        } catch (err) {
          console.error("Error loading:", url, err);
        }
      })
    );

    let filtered = allRestaurants.filter((ele) =>
      ele.city?.toLowerCase().includes(getCity.toLowerCase()) ||
      ele.address?.toLowerCase().includes(getCity.toLowerCase())
    );

		if (filtered.length === 0) {
  	filtered = allRestaurants.filter((ele) =>
    ele.city?.toLowerCase().includes("delhi")
  	);
	}

    setFilterRestaurant(filtered);
		setLoading(false);
  };

  useEffect(() => {
    if (getCity) {
      loadAndFilterData();
    }
  }, [getCity]);

	// var filter_restaurant = restaurant.filter(ele=> 
	// 	ele.city?.toLowerCase().includes(getCity) ||
	// 	ele.address?.toLowerCase().includes(getCity)
	// );

	// let bool = false;
	// if(filter_restaurant.length === 0){
	// 	bool = true;
	// }
	if(choices === 1){
  filter_restaurant.sort((a, b) => {
    const costA = parseInt(a.cost.replace(/\D/g, ''));
    const costB = parseInt(b.cost.replace(/\D/g, ''));
    return costB - costA;
  });
	} else if(choices === 2){
		filter_restaurant.sort((a, b) => {
  const costA = parseInt(a.cost.replace(/\D/g, ''));
  const costB = parseInt(b.cost.replace(/\D/g, ''));
  return costA - costB; // ascending
});
	} else if(choices===3){
		filter_restaurant.sort((a, b) => {
  return parseFloat(b.rating) - parseFloat(a.rating);
});

	}

	const [visiblelen,setVisiblelen] = useState(8);

	const loadMore = ()=>{
		setVisiblelen((prevlen)=>prevlen+8);
	}

	const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

	const [activeTab, setActiveTab] = useState("Overview");

	const [selectedRestaurant, setSelectedRestaurant] = useState('');


  const handleSearchSelect = (value) => {
    if (!value) return;
    setSelectedRestaurant(value);
  };

	const specific_search = filter_restaurant.find(ele => ele.id === selectedRestaurant);


	const handleChoices = (ele)=>{
		setChoices(ele);
	}

	const option = [
		{name:'Prices for Two: High to low',id:1},
		{name:'Prices for Two: Low to High',id:2},
		{name:'Rating: High to low',id:3},
	]

	return(
		
		<div className="card" id={id}>
			<Heading heading={"Top Pick Restaurants"}/>
			<CardSearch city={getCity} rest={filter_restaurant} onSelect = {handleSearchSelect}/>
			{selectedRestaurant && (
				<div className="specific-card">
					<img src={specific_search.image_url} alt={specific_search.image_url} />
					<p id='rest-card-name'>{specific_search.rest_name}</p>
					
					<div className="specific-card-flex">
						<table>
							<tr>
								<th>Address</th>
								<td>
										{specific_search.address}
										<a 
											href={`https://www.google.com/maps?q=${specific_search.direction}`} 
											target='_blank'
										>
											{`- Direction`}
										</a>
									</td>
							</tr>

							<tr>
								<th>Cuisine</th>
								<td>
									<ul>
										 {specific_search.item === "0" ? (
												<p>Not available</p>
											) : (
												specific_search.item
													.split(",")
													.map((ele, idx) => <li key={idx}>{ele.trim()}</li>)
											)}
									</ul>
								</td>
							</tr>

							<tr>
								<th>Facility</th>
								<td>
									<ul>
										  {specific_search.fact === "0" ? (
												<p>Not available</p>
											) : (
												specific_search.fact
													.replace(/[\[\]']/g, "")
													.split(",")
													.map((ele, index_1) => <li key={index_1}>{ele.trim()}</li>)
											)}

									</ul>
								</td>
							</tr>

							<tr>
								<th>Phone</th>
								<td>{specific_search.number}</td>
							</tr>

						</table>

						<div className="specific-card-menu">
							{specific_search.menu === "0" ? (
								<p>Not available</p>
							) : (
								specific_search.menu
									.replace(/[\[\]']/g, "")
									.split(",")
									.map((ele, index_1) => <img key={index_1} src={ele.trim()} alt='MENU'/>)
							)}
						</div>

					</div>
					
				</div>
			)}
			{/* {bool && (
				<p>No Match found for {getCity}. Instead of this showing Delhi Restaurants.</p>
			)} */}

			{loading ? (
			<div className="loading-spinner">
				<p>Loading data, please wait...</p>
			</div>
		) :(
			<>
			<SearchFilter option={option} choice = {handleChoices}/>

			<div className="card-grid-view">
				{filter_restaurant.slice(0,visiblelen).map((label,index)=>(
					<div className={`card-section ${expandedIndex===index?'expand':''}`} key={index}>
					
					<div className="card-img-section" onClick={()=>handleExpand(index)}>
						<img src={label.image_url} alt="Restaurant" />
						<div className="card-know-more">
							<button>Know More</button>
						</div>
					</div>
					<div className="card-info">
						<div className='rest-name'>
							<h3 style={{'textTransform':'capitalize'}}>{label.rest_name}</h3>
							<div className="rating">
								<p>{label.rating === 0 ? '-':label.rating}</p>
								<img src={image[1]} alt="watchlist" id='rating-image'/>
							</div>
						</div>
					</div>
					
					{expandedIndex === index && (
						<div className="expanded-details">
							<div className="tabs">
								{["Overview", "Reviews", "Menu"].map((tab) => (
								<p
									key={tab}
									className={activeTab === tab ? "active" : ""}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</p>))}
							</div>
							{activeTab === 'Overview'?
							<div className="tabs-info">
								<div className="address">
									<h3>Address</h3>
									<p>{label.address}</p>
									<a href={`https://www.google.com/maps?q=${label.direction}`} target='_blank'>{`> Direction`}</a>
								</div>
								<div className="Cuisine">
									<h3>Cuisine</h3>
									<ul>
										 {label.item === "0" ? (
												<li>Not available</li>
											) : (
												label.item
													.split(",")
													.map((ele, idx) => <li key={idx}>{ele.trim()}</li>)
											)}
									</ul>
								</div>
								<div className="facility">
									<h3>Facility</h3>
									<ul>
										  {label.fact === "0" ? (
												<li>Not available</li>
											) : (
												label.fact
													.replace(/[\[\]']/g, "")
													.split(",")
													.map((ele, index_1) => <li key={index_1}>{ele.trim()}</li>)
											)}

									</ul>

								</div>
								<div className="phone">
									<h3>Phone</h3>
									<p>{label.number}</p>
								</div>
							</div>:null}

							{activeTab === 'Reviews'?
							<div className="tabs-info">
								<div className="tab-review">
									<div className="tab-review-inner">
										{
										label.review === "0" ? (
											<p>No Reviews</p>
										) : (
											// Only parse the review if it's a string
											Array.isArray(label.review)
												? label.review.map((ele, index1) => (
														<div className="user-review" key={index1}>
															<img src={user} alt="" id="profile" />
															<div className="user-detail">
																<h5>{ele.name}</h5>
																<p>
																	<img src={rating} alt="" id="user-rating" /> {ele.rating}
																</p>
																<p>{ele.review}</p>
															</div>
														</div>
													))
												: 
													typeof label.review === "string"
													? (() => {
															try {
																const parsedReview = JSON.parse(
																	label.review
																		.replace(/'/g, '"') 
																		.replace(/\\"/g, '"') 
																);
																return parsedReview.map((ele, index1) => (
																	<div className="user-review" key={index1}>
																		<img src={user} alt="" id="profile" />
																		<div className="user-detail">
																			<h5>{ele.name}</h5>
																			<p>
																				<img src={rating} alt="" id="user-rating" /> {ele.rating}
																			</p>
																			<p>{ele.review}</p>
																		</div>
																	</div>
																));
															} catch (error) {
																console.error("Invalid JSON format:", error);
																return <p>Error in Loading Reviews. Contact author!</p>;
															}
														})()
													: null 
										)
									}
									</div>
								</div>
							</div>:null}

							{activeTab === 'Menu'?
							<div className="tabs-info">
								<div className="img-menu">
									 {label.menu === "0" ? (
												<li>Not available</li>
											) : (
												label.menu
													.replace(/[\[\]']/g, "")
													.split(",")
													.map((ele, index_1) => <img key={index_1} src={ele.trim()} alt='MENU'/>)
											)}
									
								</div>
							</div>:null}

						</div>
					)}
			</div>

				))}
				
			</div>
			</>)}
				{ visiblelen < filter_restaurant.length && (
				<button id='load-more' onClick={loadMore}>Load More</button>
				)
				}
		</div>
		
	)

}

export default Card