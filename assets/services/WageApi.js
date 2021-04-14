import axios from "axios";
import { WAGE_API } from "../config";

function create(wage) {
  return axios.post(WAGE_API, wage);
}

function deleteWage(id) {
  return axios.delete(WAGE_API + "/" + id);
}

function findAll() {
  return axios.get(WAGE_API).then((response) => response.data["hydra:member"]);
}
async function find(id) {
  return axios.get(WAGE_API + "/" + id).then((response) => {
    const wage = response.data;
    return wage;
  });
}

function update(id, wage) {
  return axios.put(WAGE_API + "/" + id, {
    ...wage,
  });
}
export default {
  create,
  findAll,
  deleteWage,
  find,
  update,
};
