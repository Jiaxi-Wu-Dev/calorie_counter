import axios from "axios";

class CalorieCounterService {
  executeCalorieCounterService() {
    return axios.get("http://localhost:8080/hello-world");
  }

  executeCalorieCounterBeanService() {
    return axios.get("http://localhost:8080/hello-world-bean");
  }

  executeCalorieCounterPathVariableService(name) {
    return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);
  }
}

export default new CalorieCounterService();
