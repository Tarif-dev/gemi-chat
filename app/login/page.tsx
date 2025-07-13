'use client'
import React,{useEffect,useState} from 'react'
import {useRouter} from 'next/navigation'
import {toast} from 'react-hot-toast'
import { cookies } from 'next/headers'
import axios from 'axios'

export default function login() {
    const [user, setUser] = useState({
        email: "",
        password : "",
    })
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [buttonDisabled , setButtonDisabled] = useState(true)
    const router = useRouter()
    const onLogin = async()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("Logged in Successfully",response.data)
            router.replace("/")
        } catch (error : any) {
            console.log("Loggin failed")
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(
            user.email.length > 0 &&
            user.password.length > 0
        ){
            setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center justify-between">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            className="bg-gray-600 text-white focus:outline-none p-2"
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className="bg-gray-600 text-white focus:outline-none p-2"
          />
        </div>
        <button
          onClick={onLogin}
          className={`${buttonDisabled ? "bg-red-600" : "bg-green-500"} p-2`}
        >
          {buttonDisabled ? "All fields mandatory" : "Log in"}
        </button>
      </div>
    </div>
  )
}

