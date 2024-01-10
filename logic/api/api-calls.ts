import { patchRequest, postRequest, putRequest } from "../../infra/api/apiRequest";
import configJson from '../../config.json';

export class ApiCalls{

    async updateCustomeData(data: any){
        return await putRequest(configJson.configJson.ApiPutInfoUrl ,data,configJson.configJson.token)
    }

    async addItemsToCart(data: any){
        return await postRequest(configJson.configJson.url+'api/v2/cart' ,data,configJson.configJson.token)
    }

    async emptyItemsFromCart(){
        return await patchRequest(configJson.configJson.deleteUrl,configJson.configJson.token)
    }

    async addNewAddress(data: any){
        return await postRequest(configJson.configJson.addressUrl ,data,configJson.configJson.token)
    }

    
  
}