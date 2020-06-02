import React,{useState,useEffect} from 'react';
import {Modal,Button} from 'react-bootstrap';
import ApartmentForm from './ApartmentForm';
import requestService from './utils/axios';
import { API_ROOT } from '../config/config';
import { GATEWAY_ROOT } from '../config/config';


const CreateOrEditApartment = (props) => {

    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        id:"",
        city: "",
        address: "", 
        price:"", 
        rooms:"",
        enabeld:1,
        features:[],
        files:[]
    });

    let options=[];

    const [featuresOptions, setFeaturesOptions] = useState(options);

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    const setApartmentParams = async(e) =>{
        if (props.operation === 'Edit'){
            const apartmentDetails = await requestService(`${API_ROOT}/apartments/show/${e.target.id}`,null).get();
            setState(apartmentDetails.data);
        }
        setShow(true);
    }

    const getFeatures = async () =>{
                         //Get all features options from DB 
                         const responseFeatures = await requestService(`${API_ROOT}/apartments/features/`,null).get();
                         responseFeatures.data.map(feature => {
                         options.push({key: feature.id, value: feature.feature_name});
                     })
                     setFeaturesOptions(options);  
    }

    useEffect( 
        () => {
            getFeatures();
        },        
    []);

    const buildFormData = (object) => {
        const formData = new FormData();
      
        for (const property in object) {
            if (Array.isArray(object[property])){
                arrayToFormData(object[property],property,formData);      
            }else{
                formData.append(property, object[property]);
            }
        }
        return formData;
    }


    const arrayToFormData = (array,property,formData) => {
        array.map( value => {
            formData.append(property,value)
        })
        return formData;
    }

    const clearState = (state) =>{
       let newState = {};
       for (const property in state){
           debugger
            newState[property]= Array.isArray(state[property])?[]:'';
       }
      setState(newState);
    }
    const createThisApartment = async (e) =>{
        try{
            const resultApartment= await requestService(`${GATEWAY_ROOT}/apartments/create/`, 
            buildFormData(
                { 
                    ...state,
                }
            )).post();
            handleClose();
            props.setAllApartments();
            clearState(state);
            return;
        }catch(err){
             console.error(err);
        }
    }

    const editThisApartment = async () =>{
        const result = await requestService(`${API_ROOT}/apartments/edit/${state.id}`, {state}).update();
        handleClose();
        props.setAllApartments();
        return;
    }

    const setInputChange =  (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    
    const setMultiSelect = (name,value)=>{
        setState({
            ...state,
            [name]: value
        });
    }

    const setImagesApartment = (files) =>{
        setState({
            ...state,
           files
        });

    }

    return (
            <>
                &nbsp;&nbsp;&nbsp;
                <button id={props.id} className={props.operation === 'Create' ? "btn btn-primary" : "btn btn-outline-primary"}
                        onClick={setApartmentParams}>
                        {props.operation === 'Create' ? 'Add Apartment' : 'Edit'}
                </button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Apartment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ApartmentForm operation={props.operation}
                                       params={state}
                                       options = {featuresOptions} 
                                       setMultiSelect={setMultiSelect} 
                                       setInputChange={setInputChange} 
                                       createThisApartment={createThisApartment}
                                       editThisApartment={editThisApartment}
                                       setImagesApartment ={setImagesApartment}
                                       />
                    </Modal.Body>
                </Modal>   
            </> 
    );
}


export default CreateOrEditApartment;