import backendAPI, {req} from "./Http"

const  API = {
    return req.post(backendAPI.login, {user: 'qiphon'}),
}

export default API

