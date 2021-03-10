import axios from "axios";
import { WAGE_API } from "../config";

function create(wage) {
  return axios.post(WAGE_API, wage);
}
export default {
  create,
};
