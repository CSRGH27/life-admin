import $ from "jquery";

function errorForm(modal) {
  $(modal).addClass("shake-horizontal shake-constant");
  setTimeout(() => {
    $(modal).removeClass("shake-horizontal shake-constant");
  }, 500);
}

export default {
  errorForm,
};
