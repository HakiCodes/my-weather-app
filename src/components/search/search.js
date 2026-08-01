import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=' + inputValue;
        const geoApiOptions = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_GEO_API_KEY,
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, geoApiOptions);
            const result = await response.json();

            if (!result || !result.data || !Array.isArray(result.data)) {
                return { options: [] };
            }

            return {
                options: result.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,}
                }
                )
            };
        } catch (error) {
            console.error(error);
            return {
                options: []
            };
        }
    };


    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;