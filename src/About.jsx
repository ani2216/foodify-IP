import { useState ,useEffect} from "react";
import Heading from "./Heading";
import img from './assets/foodify_intro.jpeg'

function About(){

	const useAnimatedCounter = (target, speed = 10, steps = 500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(target / steps);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, speed);

    return () => clearInterval(interval);
  }, [target, speed, steps]);

  return count;
};


	return(
		<div className="about-container">
			<Heading heading={'About Foodify'}/>

			<div className="about-inner">
				<div className="about-left">
					<h1>Bringing Together Taste & Design For You!</h1>
					<p>Discover the best restaurants around you and explore delicious recipes to cook at home. Whether you're dining out or staying in, Foodify has something tasty for every mood.
More features and foodie finds coming soon — stay tuned!</p>
					<div className="about-count">
						<div className="about-rest">
							<h3>{useAnimatedCounter(100000).toLocaleString()}+</h3>
							<p>Restaurants</p>
						</div>
						<div className="about-recipes">
							<h3>{useAnimatedCounter(5000).toLocaleString()}+</h3>
							<p>Recipes</p>
						</div>
					</div>
				</div>
				<div className="about-right">
					<div className="img-slider">
					<img src={img} alt="Foodify Image" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default About;