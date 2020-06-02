import React, {useState} from 'react';
import Dropzone from 'react-dropzone';

const Upload = (props) => {

  const onDrop = async (uploadedfiles) => {
    console.log(uploadedfiles)
    props.setFiles(uploadedfiles)
  }
 
  const filesUploaded =
    props.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
  ));
  

  return (
      <Dropzone multiple onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{filesUploaded}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }

  export default Upload;