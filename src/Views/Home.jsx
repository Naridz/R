import React from 'react'
import {useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//Alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const Home = () => {
    const [users,setUsers] = useState([])

    // Get
    const getUser = async ()=>{
        await axios.get(`${import.meta.env.VITE_API}/users`)
        .then((response)=>{
            if (response.status === 200){
                setUsers(response.data)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getUser()
    },[])
    // Delete
    const DeleteUser = async(id)=>{
      await axios.delete(`${import.meta.env.VITE_API}/users/delete`,{data:{id}})
      .then((response)=>{ 
        MySwal.fire({
          title: "User has been deleted !",
          icon: "success",
          timer: 1500
        });
        setUsers(users.filter((u)=>u.id !== id))
      }).catch((error)=>{
        console.log(error)})
    }
  return (
    <>
    <div className='container mx-auto'>
      <Link to='add' className='btn btn-secondary mb-1'>Add</Link>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='bg-base-200'>
        <th>No.</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Username</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {!!users && users.map((user,i)=>
      <tr key={i} className='hover'>
      <th>{user.id}</th>
      <td>{user.fname}</td>
      <td>{user.lname}</td>
      <td>{user.username}</td>
      <th>
      <div className='btn-group'>
      <Link to={`/edit/${user.id}`} className="btn hover:bg-info hover:text-white mx-1">EDIT</Link>
      <button className="btn hover:bg-error hover:text-white" 
      onClick={()=>DeleteUser(user.id)}>DELETE</button>
      </div>
      </th>
    </tr>
      )}
    </tbody>
  </table>
  <p className='m-5 text-sm'>* Edit ได้ตั้งแต่ No.13</p>

  {/* loading */}
  {users.length ===0 && <div className="btn flex justify-center mt-2">
  <Link to='add' className='btn btn-block btn-ghost mt-2'>Add</Link></div>}
</div>
    </div>
    </>
  )
}

export default Home