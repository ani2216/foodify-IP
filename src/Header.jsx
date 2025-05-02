import { useState } from 'react';
import './App.css'
import restlogo from './assets/restlogo.png'
import dishlogo from './assets/dishlogo.png'
import bloglogo from './assets/bloglogo.png'
import followlogo from './assets/followlogo.png'
import logo from './assets/cosylablogo.png'

function Header({scrollSection}){

	return(
		<div className="header">
			<h1>Foodify</h1>

			<div className="nav-bar">
				<ul>
					<div className="nav">
						<img src={restlogo} alt="" onClick={()=> scrollSection('restaurant_sec')}/>
						<li onClick={()=> scrollSection('restaurant_sec')}>Restaurants</li>
					</div>
					<div className="nav">
						<img src={dishlogo} alt="" onClick={()=> scrollSection('dish_sec')}/>
						<li onClick={()=> scrollSection('dish_sec')}>Dishes</li>
					</div>
					<div className="nav">
						<img src={bloglogo} alt="" onClick={()=> scrollSection('blog_sec')}/>
						<li onClick={()=> scrollSection('blog_sec')}>Blogs</li>
					</div>
					<div className="nav">
						<img src={followlogo} alt="" onClick={()=> scrollSection('footer_sec')}/>
						<li onClick={()=> scrollSection('footer_sec')}>Follow</li>
					</div>
				</ul>
			</div>

			<div className="hang-banner">
				<div className="location">
					<img src={logo} alt="location" />
					<p>CosyLab</p>
				</div>
			</div>
		</div>
	)

}

export default Header;