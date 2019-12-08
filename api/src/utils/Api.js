import axios from 'axios';
const API_ROOT ='http://localhost:8080';
const TIMEOUT = 60000;
const HEADERS = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

class ApiService {

    constructor(baseURL = API_ROOT, timeout = TIMEOUT, headers = HEADERS) {
        const client = axios.create({
            baseURL,
            timeout,
            headers
        });

        client.interceptors.response.use(this.handleSuccess, this.handleError);
        this.client = client;

    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        console.log("Error API:", error);
        return Promise.reject(error);
    }

    get(path) {
        return this.client.get(path).then(response => response.data);
    }

    post(path, payload) {
        return this.client.post(path, payload).then(response => response.data);
    }

    put(path) {
        return this.client.put(path).then(response => response.data);
    }

    delete(path) {
        return this.client.delete(path).then(response => response.data);
    }

    patch(path){
        return this.client.patch(path).then(response => response.data);
    }
}

export default ApiService;