import React, {useState} from 'react';
import Carousel from 'react-images';
import {Modal} from 'react-bootstrap';

const ImagesGallery = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const frontimage = props.images[0].src;
    return (
        <>
        <img id="frontimage" src={frontimage} onClick={handleShow}/> 
        <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel views={props.images} />
                    </Modal.Body>
        </Modal> 
        </>  
    )}
    
export default ImagesGallery;