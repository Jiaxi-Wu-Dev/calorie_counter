import axios from 'axios';


class CalorieCounterService {
    executeCalorieCounterService() {
        return axios.get('http://localhost:8080/hello-world')
    }
}

export default new CalorieCounterService()