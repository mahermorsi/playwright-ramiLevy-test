import { UserBodyRequest } from "../logic/api/request-body/user-body-request"


const parseUserBodyToJSON = (object: UserBodyRequest)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}

export{parseUserBodyToJSON}