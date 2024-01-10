import { CartBodyRequest } from "../logic/api/request-body/cart-body-request"
import { UserBodyRequest } from "../logic/api/request-body/user-body-request"


export const parseBodyToJSON = (object: Object)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}