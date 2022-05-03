import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DriveFolderUploadOutlined } from '@mui/icons-material'

import { auth, db, storage } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { serverTimestamp, setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

import userImage from '../../assets/no_image.png'

import './styles.scss'

interface INew {
  title: string
  inputs: any
  path: string
}

interface IField {
  id: number
  label: string
  type: string
  placeholder: string
  name?: string
}

function New({ title, inputs, path }: INew) {

  const [file, setFile] = useState<any>()
  const [data, setData] = useState<any>({})
  const [percentage, setPercentage] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setPercentage(progress)
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (err) => {
          console.log('error=',err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev: any)=>({...prev, img:downloadURL} ))
          })
        }
      )
    }

    file && uploadFile()

  }, [file])

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
      if(path === 'users'){
        const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
        await setDoc(doc(db, 'users', res.user.uid), {
          ...data,
          timestamp: serverTimestamp()
        })
      }

      if(path === 'todos'){
        if(data.name){
          await addDoc(collection(db, 'todos'), {
            name: data.name,
            status: data.status === 'complete' ? true : false,
            timestamp: serverTimestamp()
          })
        }
      }

      navigate(-1)
    } catch (err) {
      console.log('error=', err)
    }
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1 className='title'>{title}</h1>
        </div>
        <div className='bottom'>
          {path === 'users' &&
            <div className='left'>
              <img
                src={file ? URL.createObjectURL(file) : userImage}
                alt='no'
                />
            </div>
          }
          <div className='right'>
            <form onSubmit={handleAdd}>
              {path === 'users' &&
                <div className='formInput'>
                  <label htmlFor='file'>
                    Image: <DriveFolderUploadOutlined className='icon'/>
                  </label>
                  <input
                    type='file'
                    id='file'
                    style={{display: 'none'}}
                    onChange={(e) => handleFile(e)}
                    />
                </div>
              }

              {inputs?.map((field: IField) => (
                <div className='formInput' key={field.id}>
                  <label htmlFor={String(field.id)}>{field.label}</label>
                  {field.type === 'option' ?
                    <select id={String(field.id)} onChange={handleInput}>
                      <option value="">--Please choose an option--</option>
                      <option value="complete">Complete</option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                    :
                    <input
                      id={String(field.id)}
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      onChange={handleInput}
                    />
                  }

                </div>
              ))}

              <div className='formInput'>
                <button
                  disabled={percentage !== null && percentage < 100}
                  type='submit'>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export { New }
