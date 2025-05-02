import filter from './assets/filter.png'
import direction from './assets/directionlogo.png'
import down from './assets/down.png'
import { useState } from 'react';

function CardSearch({city,rest,onSelect}){

  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [selected, setSelected] = useState(false);


  const handleChange = (e) => {
    const value = e.target.value;
  	setQuery(value);
		setSelected(false);


  if (value.trim() === '') {
    setFilteredSuggestions([]);
    return;
  }

  const suggestions = rest.filter((ele) => {
    const nameMatch = ele.rest_name?.toLowerCase().includes(value.toLowerCase());
    const itemMatch = ele.item?.toLowerCase().includes(value.toLowerCase());
    return nameMatch || itemMatch;
  });

  setFilteredSuggestions(suggestions);
  };

  const handleSelect = (name,id) => {
		if (!id || !name) return;
    setQuery(name);
    setFilteredSuggestions([]);
		setSelected(true);
		if(onSelect) onSelect(id);
  };

	return(
		<div className="card_search">
			<div className="search-rest-bar">
				<div className="city_search">
					<img src={direction} alt="" />
					<p>{city}</p>
					<img src={down} alt="" />
				</div>
				<hr id='hr'/>
				<div className="search_bar">
					<input type="text" value={query} onChange={handleChange} name="search" id="search" placeholder="Search by restaurant name or food ........"/>
					{(filteredSuggestions.length > 0 && !selected) && (
            <ul className="suggested-box">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((label, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelect(label.rest_name,label.id)}
                    className="suggested-item"
                  >
                    <span className='suggested-rest-name'>{label.rest_name}</span>{label.item !== 0 && label.item !== '0' && (
													<> - <span className="suggested-span">{label.item}</span></>
												)}
                  </li>
                ))
              ) : query && !selected ? (
                <li className="suggested-item">No matches found</li>
              ) : null}
            </ul>
          )}
				</div>
			</div>

		</div>
	)

}

export default CardSearch;