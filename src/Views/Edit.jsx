import { useEffect, useState } from "react"
import axios from "axios"
import { Link,useParams,useNavigate } from "react-router-dom"
//Alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Edit = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const [user,setUser]=useState({
    
  })

  const getData=async ()=>{
    await axios.get(`${import.meta.env.VITE_API}/users/${id}`)
    .then((response)=>{
      if (response.status === 200){
        setUser(response.data.user)
    }
    }).catch((error=>{console.log(error)}))
  }
  useEffect(()=>{
    getData()
  },[])

  const onchangeEdit=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const editUser = async()=>{
    await axios.put(`${import.meta.env.VITE_API}/users/update`,{id,...user})
    .then((response)=>{
      if (response.status === 200){
        MySwal.fire({
          title: "Success !",
          icon: "success",
          timer: 1500
        });
        navigate('/')
      }
    })
    .catch((error)=>{console.log(error)})
  }

  return (
    <div className='container mx-auto'>
      {!!user && <div>
    {/* Name */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Name</span>
    </div>
    <input type="text" placeholder="Type here"
    name="fname" value={user.fname} 
    onChange={onchangeEdit}
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Surname*/}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Surname</span>
    </div>
    <input type="text" placeholder="Type here"
    name="lname" value={user.lname} 
    onChange={onchangeEdit}
    className="input input-bordered w-full max-w-xs" />
    </label>
    {/* Username */}
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Username</span>
    </div>
    <input type="text" placeholder="Type here"
    name="username" value={user.username} 
    onChange={onchangeEdit}
    className="input input-bordered w-full max-w-xs" />
    </label>
    <button className='btn hover:bg-success hover:text-black mt-2' 
    onClick={editUser}>Edit</button>
    <Link to='/' className='btn hover:bg-error hover:text-white ml-1 mt-2'
    >Cancel</Link>
    </div>}
    </div>
  )
}

export default Edit