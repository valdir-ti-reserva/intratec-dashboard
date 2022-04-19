import { useState } from 'react'
import { serverTimestamp, setDoc, doc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase';

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
  const [data, setData] = useState<any>({})
  
  const handleFile = (e: any) => {
    if(!e.target.files) return    
    setFile(e.target.files[0])  
  }

  const handleInput = (e: any) => {
    const id = e.target.id
    const value = e.target.value
    setData({...data, [id]:value})
  }


  const handleAdd = async(e: any) => {
    e.preventDefault()
    
    try {      
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timestamp: serverTimestamp()
      })
      } catch (err) {
      console.log('error=', err)
    }
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
            <form onSubmit={handleAdd}>
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
                  <input 
                    id={String(field.id)}
                    type={field.type} 
                    placeholder={field.placeholder} 
                    onChange={handleInput} 
                  />
                </div>
              ))}
              
              <div className="formInput">
                <button type='submit'>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export { New }
