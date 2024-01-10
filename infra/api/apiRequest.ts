import { request } from "@playwright/test"


const putRequest = async (url:string,body:any,token:string) => {
    const myRequest = await request.newContext()
    return await myRequest.put(url,{
    data:body,
    headers:{"Ecomtoken":token,}
   })      
}

const postRequest = async (url:string,data:any,token:string) => {
    const myRequest = await request.newContext()
    return await myRequest.post(url,{
    data:{data},
    headers:{"Ecomtoken":token,}
   })      
}

export{putRequest,postRequest}