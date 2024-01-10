import { putRequest } from "../../infra/api/apiRequest";
import configJson from '../../config.json';
//import { UserBodyRequest } from "./request-body/user-body-request";

export class ApiCalls{

    async updateCustomeData(data: any){
        return await putRequest(configJson.configJson.ApiPutInfoUrl ,data,configJson.configJson.token)
    }
    

  
}