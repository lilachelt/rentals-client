import React from 'react';
import MultipleSelect from './MultipleSelect';
import Upload from './Upload';

const ApartmentForm = (props) => {

   const state = props.params;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if ( props.operation === "Create"){
            props.createThisApartment(e);
        }else if ( props.operation === "Edit"){
            props.editThisApartment();
        }
    }
    
    const handleChange = (e) =>{
       props.setInputChange(e);
    }

    const handleMultiSelect= (name,value)=> {
        props.setMultiSelect(name,value);
    } 

    const handleUploadImages = (files) =>{
        props.setImagesApartment(files);
    }

    return(
            <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col">
                    <input name="city" value={state.city} type="text" className="form-control" 
                    placeholder="City" onChange={handleChange} required/>
                </div>
                <div className="form-group col">
                    <input name="address" value={state.address} type="text" className="form-control" 
                    placeholder="Address" onChange={handleChange} required/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <input name="price" value={state.price} type="number" className="form-control" 
                    placeholder="Price" onChange={handleChange} required/>
                </div>
                <div className="form-group col">
                    <input name="rooms" value={state.rooms} type="text" className="form-control" 
                    placeholder="Rooms" onChange={handleChange} required/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <MultipleSelect name="features" multiSelect={handleMultiSelect} options={props.options} selected={state.features}/>
                </div>
            </div>
            <div className="App">
                            <div className="Card">
                                <Upload setFiles={handleUploadImages} files={state.files}/>
                            </div>
            </div>
            <button className="btn btn-primary" type="submit">submit</button>
        </form> 
    )
}


export default ApartmentForm;
