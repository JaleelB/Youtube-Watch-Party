import React, {useState, useEffect} from 'react';
import axios from "axios";

const useFetchAPi = (url) => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
                
            try{
                const results = await axios.get(url)
                setApiData(results.data.items[0].snippet)
            } catch(error){
                setError(error)
            }

            setLoading(false);
        }

        fetchData();
        
    }, [url]);


    return { apiData, loading, error};
}

//1:39:00

export default useFetchAPi;
