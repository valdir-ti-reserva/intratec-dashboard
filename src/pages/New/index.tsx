import { useState } from 'react';

import { DriveFolderUploadOutlined } from '@mui/icons-material'

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

import userImage from '../../assets/no_image.png'

import './styles.scss'

interface INew {
  title: string;
  inputs: any;
}

interface IField {
  id: number;
  label: string;
  type: string;
  placeholder: string;
}

function New({title, inputs}: INew) {

  const [file, setFile] = useState()
  
  const handleFile = (e: any) => {
    if(!e.target.files) return
    
    setFile(e.target.files[0])
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className='title'>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
              src={file ? URL.createObjectURL(file) : userImage}
              alt="no" 
            />
          </div>
          <div className="right">
            <form action="">
              <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlined className='icon'/>
                </label>
                <input 
                  type="file" 
                  id='file' 
                  style={{display: 'none'}} 
                  onChange={(e) => handleFile(e)}
                />
              </div>
              
              {inputs?.map((field: IField) => (
                <div className="formInput" key={field.id}>
                  <label>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} />
                </div>
              ))}
              
              <div className="formInput">
                <button>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export { New }
