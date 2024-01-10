import { CartBodyRequest } from "../logic/api/request-body/cart-body-request"
import { UserBodyRequest } from "../logic/api/request-body/user-body-request"


const parseUserBodyToJSON = (object: UserBodyRequest)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}
const parseCartBodyToJSON = (object: CartBodyRequest)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}

export{parseUserBodyToJSON,parseCartBodyToJSON}