import { useState } from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
//Alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Add = () => {

const navigate = useNavigate()
const [add,setAdd] = useState({
  name :"",
  surname :"",
  username:"",
  email:"",
  password:"",
  confirmpassword:""
})

const addChange = (e)=>{
setAdd({...add,[e.target.name]:e.target.value})
}

const addUser = async()=>{
if(add.password === add.confirmpassword){
  await axios.post(`${import.meta.env.VITE_API}/users/create`,{
    "fname": add.name,
    "lname": add.surname,
    "username": add.username,
    "password": add.password,
    "email": add.email,
    "avatar": add.confirmpassword
  })
  .then((response)=>{
    console.log(response)
    if(response.status === 200){
      MySwal.fire({
        title: "Success !",
        icon: "success",
        timer: 1500
      });
      navigate('/')
    }
  })
  .catch((error)=>{console.log(error)})
}else{
  MySwal.fire({
    title: "Password is wrong !",
    icon: "error",
  });
}
}
  return (
  <div className='container mx-auto'>
    {/* Name */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Name</span>
    </div>
    <input type="text" placeholder="Type here"
    name="name" onChange={addChange} 
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Surname*/}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Surname</span>
    </div>
    <input type="text" placeholder="Type here"
    name="surname" onChange={addChange}
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Username */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Username</span>
    </div>
    <input type="text" placeholder="Type here"
    name="username" onChange={addChange}
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Email */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Email</span>
    </div>
    <input type="text" placeholder="Type here"
    name="email" onChange={addChange}
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Password */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Password</span>
    </div>
    <input type="password" placeholder="Type here"
    name="password" onChange={addChange}
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Confirmpassword */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Confirm password</span>
    </div>
    {add.password.length>0?<input type="password" placeholder="Type here"
    name="confirmpassword" onChange={addChange}
    className="input input-bordered w-full max-w-xs" />:
    <input type="password" placeholder="Type here"
    name="confirmpassword" onChange={addChange}
    className="input input-bordered w-full max-w-xs" disabled />}
    </label>
    <button className='btn hover:bg-success hover:text-black mt-2' onClick={addUser}>Add</button>
    <Link to='/' className='btn hover:bg-error hover:text-white ml-1 mt-2'>Cancel</Link>
  </div>
  )
}

export default Add