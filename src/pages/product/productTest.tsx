import React,{useEffect} from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";

const ProductTest = () => {
    const user = useSelector((state: RootState) => state.user); // Get the current user state
    console.log("user.isLoggedIn:",user.isLoggedIn)
    const baseURL="http://localhost:8888"
    useEffect( ()=>{
        getTodos();
    },[])
    async function getTodos(){
        await axios(baseURL+"/todo/one")
        .then( (res)=>{
            console.log(res.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    return (
        <div>
            hello
        </div>
    );
};

export default ProductTest;