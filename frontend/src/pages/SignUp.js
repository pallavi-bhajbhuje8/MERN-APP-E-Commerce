
import React, { useState } from 'react'
// @ts-ignore
import LoginIcon from '../assest/Icon.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToobase64 from '../helpers/imageToolbase64';
import SummaryApi from '../commone';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [shadowPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",

  })
  const handleonChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
        // [password]:value
      }
    })
  }
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageToobase64(file)
    console.log("imagePic", imagePic)
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signup.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      } else {
        toast.error(dataApi.message)
      }
      console.log("data", dataApi)
    } else {
      console.log("Please check password and confirm  password")
    }

  }
  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || LoginIcon} alt='login-icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-10 bg-slate-200 pd-4 pt-2 py-5 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>

            </form>

          </div>
          <form className='pt-6 flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name :</label>
              <div className='bg-slate-100 p-2'>
                <input type='text'
                  name='name'
                  value={data.name}
                  placeholder='enter your name'
                  onChange={handleonChange}
                  className='w-full h-full outline-none bg-transparent' required />
              </div>
            </div>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input type='email'
                  name='email'
                  value={data.email}
                  placeholder='enter email'
                  onChange={handleonChange}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={shadowPassword ? "text" : "password"}
                  name='password'
                  value={data.password}
                  onChange={handleonChange}
                  placeholder='enter password'
                  className='w-full h-full outline-none bg-transparent' required />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      shadowPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleonChange}
                  placeholder='enter comfirm password'
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
          </form>
          <p className='my-5'>Already have account ? <Link to={"/login"} className="text-red-600 hover:text-red-700 hover:underline">Login</Link></p>
        </div>
      </div>

    </section>
  )
}

export default SignUp