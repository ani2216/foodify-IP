import { useEffect, useState } from 'react';
import arrow from './assets/leftarrow.png'

function ArrowTop(){

	const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


	return(
		<div className="arrow-top">
			{isVisible && (
			<img src={arrow} alt="" onClick={scrollToTop}/>
			)}
		</div>
	)

}

export default ArrowTop;