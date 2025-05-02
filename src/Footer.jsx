import React from "react";
import packageJSON from '../package.json'
import { useState,useEffect } from "react";

function Footer({id}){

	const [city, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://ani2216.github.io/ani2216/cities.txt");
        const text = await response.text();
        const cityList = text.split(',').map(city => city.trim());
        setCities(cityList);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

	// const handleClick = ()=>{
	// 	alert('Coming Soon!');
	// }

	return(
		<div className="footer" id={id}>
			<div className="footer-quote">
				<p>EveryDay Tasty Food!</p>
			</div>
			<div className="footer-city">
				<h3>Restaurants By City:</h3>
				<ul>
				{city.map((ele,index)=>(
					<li key={index}>{ele}</li>
				))}
				</ul>
			</div>

			<div className="footer-foot">
				<div className="left foot">
					<div className="follow">
						<p>Follow us:</p>
						<div className="follow-icon">
							<a href="https://www.instagram.com/_.foodify._?igsh=MWtld3lmOGZpNHc0cg==" target="_blank" class="fa fa-instagram"></a>
							<a href="https://github.com/ani2216" target="_blank" class="fa fa-github"></a>
							<a href="https://www.youtube.com/@fnf.in247" target="_blank" class="fa fa-youtube"></a>
						</div>
					</div>
				</div>
				<div className="center foot">
					<p>© 2025 Foodify. All rights reserved.</p>
				</div>
				<div className="right foot">
					<p>Version: {packageJSON.version}</p>
				</div>
			</div>
		</div>
	)
}

export default Footer;