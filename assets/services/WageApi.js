import axios from "axios";
import { WAGE_API } from "../config";

function create(wage) {
  return axios.post(WAGE_API, wage);
}

function deleteWage(id) {
  return axios.delete(WAGE_API + "/" + id);
}

function findAll() {
  return axios.get(WAGE_API).then((response) => response.data);
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

function updateWagePdf(id, pdf) {
  const formData = new FormData();
  formData.append("pdf", pdf[0]);
  return axios({
    method: "post",
    url: WAGE_API + "/" + id + "/pdf",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "localhost",
    },
  });
}

function updateDisplay(id) {
  return axios.post(WAGE_API + "/" + id + "/display", {});
}
function updatePdf(id, pdf) {
  return axios.put(WAGE_API + "/" + id, {
    ...pdf,
  });
}
export default {
  create,
  findAll,
  deleteWage,
  find,
  update,
  updatePdf,
  updateDisplay,
  updateWagePdf,
};
