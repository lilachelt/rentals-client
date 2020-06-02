import React, {useState, useEffect} from 'react';
import requestService from './utils/axios';
import SearchBar from './SearchBar';
import RangeSlider from './RangeSlider';
import debounce from 'debounce';
import { API_ROOT } from '../config/config';

const Filters = () => {
    
    const filtersFields=['Price','Rooms'];
    const [state, setState] = useState({ 
        city: "", 
        address: "",
        maxPrice:null,
        minPrice:null,
        maxRooms:null,
        minRooms:null,
    });
    const [initMaxPrice,setInitMaxPrice] = useState();
    const [initMaxRooms,setInitMaxRooms] = useState();
    const [initMinPrice,setInitMinPrice] = useState();
    const [initMinRooms,setInitMinRooms] = useState();

    const fechInitData = async() => {
           try{
               const { data } = await requestService(`${API_ROOT}/apartments/initFilters`, {params:{filtersFields}}).get();
               if (data){
                   const resultMinPrice = Number(data[0].Price.min);
                   const resultMaxPrice = Number(data[0].Price.max);
                   const resultMinRooms = Number(data[1].Rooms.min);
                   const resultMaxRooms = Number(data[1].Rooms.max);
       
                   setState({
                       ...state,
                       maxPrice: resultMaxPrice,
                       minPrice: resultMinPrice,
                       maxRooms: resultMaxRooms,
                       minRooms: resultMinRooms
                   });
       
                   setInitMinPrice(resultMinPrice)
                   setInitMaxPrice(resultMaxPrice)
                   setInitMinRooms(resultMinRooms)
                   setInitMaxRooms(resultMaxRooms)
               }
            }catch(err){
               return(
                   <div>Sorry, Try later</div>
               )
           }
   
    }

    useEffect(
        () => {
            fechInitData();
    }, []);


    const handleChangeParams = debounce((value,name) => {
        setState({
            ...state,
            [name]: value
          });
}, 800)

const setMinAndMaxSelected =  debounce (({ min, max, name }) => {
    setState({
        ...state,
        [`min${name}`]: min,
        [`max${name}`]: max
    });
} ,100)

    return( 
        <>
                <div className="row">
                    <div className="col">
                        <SearchBar name={'city'} search={handleChangeParams} placeholder='Search City...'/>
                    </div>
                    <div className="col">
                        <SearchBar name={'address'} search={handleChangeParams} placeholder='Search Address...'/>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-xs-4">
                                <span className="bold">Price</span>
                            </div>
                            <div className="col">
                                <RangeSlider name={'Price'} initMinValue={initMinPrice} initMaxValue={initMaxPrice} 
                                             setMinAndMaxSelected={setMinAndMaxSelected}
                                             maxSelected={state.maxPrice} minSelected={state.minPrice}/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                                <div className="col-xs-4">
                                    <span className="bold">Rooms</span>
                                </div>
                                <div className="col">
                                <RangeSlider name={'Rooms'} initMinValue={initMinRooms} initMaxValue={initMaxRooms} 
                                             setMinAndMaxSelected={setMinAndMaxSelected}
                                             maxSelected={state.maxRooms} minSelected={state.minRooms}/>
                                </div>
                        </div>
                    </div>
                </div>
        </>
    )}
export default Filters;