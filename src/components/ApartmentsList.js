import React , {useState , useEffect} from 'react';
import requestService from './utils/axios';
import { ListGroup } from 'react-bootstrap';
import { API_ROOT , GATEWAY_ROOT, S3_ROOT} from '../config/config';
import ImagesGallery from './ImagesGallery'
import EditApartment from './CreateOrEditApartment'
import utilsFunctions from './utils/utilsFunctions';
import '../css/index.css';


const ApartmentsList= ({state}) => {
     const [apartments,setApartments] = useState([]);

    const fetchApartmentList = async ()=> {
        const apartmentsArrResult = await requestService(utilsFunctions.buildUrlWithQuery(`${GATEWAY_ROOT}/apartments/`, state)).get();
        setApartments(apartmentsArrResult.data);
    }

    useEffect( 
        () => {
           fetchApartmentList();
    },
    [state]);

    const setAllApartments = () =>{
        fetchApartmentList();
    }

    const removeApartment = async (id) => {
        const result = await requestService(`${API_ROOT}/apartments/${id}`, null).remove();
        fetchApartmentList();
    }

    const getImages = (imagesLinksArr)=>{
        //if there is images to this apartment
        if (imagesLinksArr.length > 0){
            const imagesObjectArr = imagesLinksArr.map(file => {
                return {'src': file };
            })
            return imagesObjectArr;
        }else{
            return [{'src':`${S3_ROOT}/no-images.png`}];
        }
    }

    if(apartments.length == 0 ){
        return <div><br></br> Sorry, the apartments list is empty</div>
    }
    return ( 
            <ListGroup variant="flush">
                {apartments.map((record,key) => (
                    <ListGroup.Item key={key} value={record.id} >
                        <div className="row">
                            <div className="col">
                                <ImagesGallery images={getImages(record.files)}/>
                            </div>
                            <div className="col">
                                <span className="bold">City </span>
                                {record.city}
                                <br></br>
                                <span className="bold">Address </span>
                                {record.address}
                            </div>
                            <div className="col">
                            <span className="bold">Price </span>
                                {record.price}
                                <br></br>
                                <span className="bold">Rooms </span>
                                {record.rooms}
                            </div>
                            <div className="col">
                                {record.features.map((feature,key) => (
                                  <i className="fa fa-check" key={feature.id}>{feature.feature_name}&nbsp;&nbsp;</i>                                                       
                                ))}
                            </div>
                            <div className="row-fluid">
                                    <button type="button" className="btn btn-outline-danger" 
                                            onClick={()=>{removeApartment(record.id)}}>
                                        Remove
                                    </button>
                                <EditApartment operation={'Edit'} id={record.id} setAllApartments={setAllApartments}/>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
   );
};

export default ApartmentsList;