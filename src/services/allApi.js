import { commonAPI } from "./commonApi"
import SERVER_URL from "./serverUrl"


//register Api 
export const registerAPI=  async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}


//login api
export const loginAPI=  async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

//add-projectapi
export const addProjectAPI =async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//gethom-projectapi
export const getHomeProjectAPI =async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/get-home-project`,"","")
}

//getAll-projectapi
export const getAllProjectAPI =async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-all-project?search=${searchKey}`,"",reqHeader)
}

//getuser-projectapi
export const getUSerProjectAPI =async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-user-project`,"",reqHeader)
}


//user/edit
export const updateUserProfileAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

//project/edit/
export const updateProjectAPI= async(projectid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectid}`,reqBody,reqHeader)
}

//remove_project
export const deleteProjectAPI=async(projectid,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove_project/${projectid}`,{},reqHeader)
}