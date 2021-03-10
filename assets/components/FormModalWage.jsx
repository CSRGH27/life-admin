import {
  Backdrop,
  Button,
  FormControl,
  Grow,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import Animations from "../services/Animations";
import WageApi from "../services/WageApi";
import SaveIcon from "@material-ui/icons/Save";
import { error } from "jquery";

const FormModal = ({ open, setOpen, title, props }) => {
  const [errors, setErrors] = useState({
    Amount: "",
    company: "",
    contributions: "",
    month: "",
    year: "",
  });
  const [data, setData] = useState({
    Amount: "",
    company: "",
    contributions: "",
    month: "",
    year: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await WageApi.create(data);
      props.history.replace("/wageslip");
    } catch ({ response }) {
      const violation = response.data.violations;
      if (violation) {
        const apiErrors = {};
        violation.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
        console.log(errors);
      }
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setData({ ...data, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className="ctn_modal"
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Grow className="inner_modal_form" in={open}>
        <div>
          <div className="top_modal">
            <h2 className="transition-modal-title">Nouvelle {title}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              {errors.Amount ? (
                <TextField
                  error
                  helperText={errors.Amount}
                  id="Amount"
                  value={data.Amount}
                  color="secondary"
                  name="Amount"
                  label="Montant de votre salaire net"
                  onChange={handleChange}
                />
              ) : (
                <TextField
                  id="Amount"
                  value={data.Amount}
                  color="secondary"
                  name="Amount"
                  label="Montant de votre salaire net"
                  onChange={handleChange}
                />
              )}
            </FormControl>
            {errors.company ? (
              <TextField
                error
                helperText={errors.company}
                fullWidth
                value={data.company}
                required
                onChange={handleChange}
                label="Nom de l'entreprise"
                name="company"
                color="secondary"
              />
            ) : (
              <TextField
                fullWidth
                value={data.company}
                required
                onChange={handleChange}
                label="Nom de l'entreprise"
                name="company"
                color="secondary"
              />
            )}

            <FormControl fullWidth>
              {errors.contributions ? (
                <TextField
                  error
                  helperText={errors.contributions}
                  id="contributions"
                  value={data.contributions}
                  color="secondary"
                  name="contributions"
                  onChange={handleChange}
                  label="Montant de vos charge sociales"
                />
              ) : (
                <TextField
                  id="contributions"
                  value={data.contributions}
                  color="secondary"
                  name="contributions"
                  onChange={handleChange}
                  label="Montant de vos charge sociales"
                />
              )}
            </FormControl>
            <FormControl fullWidth>
              {errors.month ? (
                <TextField
                  error
                  helperText={errors.month}
                  id="month"
                  value={data.month}
                  color="secondary"
                  name="month"
                  onChange={handleChange}
                  label="Mois du salaire"
                />
              ) : (
                <TextField
                  id="month"
                  value={data.month}
                  color="secondary"
                  name="month"
                  onChange={handleChange}
                  label="Mois du salaire"
                />
              )}
            </FormControl>
            <FormControl fullWidth>
              {errors.year ? (
                <TextField
                  error
                  helperText={errors.year}
                  id="year"
                  value={data.year}
                  color="secondary"
                  name="year"
                  onChange={handleChange}
                  label="Année du salaire"
                />
              ) : (
                <TextField
                  id="year"
                  value={data.year}
                  color="secondary"
                  name="year"
                  onChange={handleChange}
                  label="Année du salaire"
                />
              )}
            </FormControl>
            <Button
              type="submit"
              className="button_form"
              variant="contained"
              color="secondary"
              startIcon={<SaveIcon />}
            >
              Créer
            </Button>
          </form>
        </div>
      </Grow>
    </Modal>
  );
};

export default FormModal;
