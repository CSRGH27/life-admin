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
import { CloudUploadOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import Animations from "../services/Animations";
import DropZone from "./DropZone";
const FormModal = ({ open, setOpen, title }) => {
  const [errors, setErrors] = useState({
    amount: "",
    company: "",
    contribution: "",
    date: "",
    file: "",
  });
  const [data, setData] = useState({
    amount: "",
    company: "",
    contribution: "",
    date: "",
    file: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiErrors = {};
    if (data.date === "") {
      Animations.errorForm(".inner_modal_form");
    } else {
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setData({ ...data, [name]: value });
    console.log(data);
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
              <InputLabel required color="secondary" htmlFor="amount">
                Montant de votre salaire net
              </InputLabel>
              <Input
                id="amount"
                value={data.amount}
                color="secondary"
                name="amount"
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">€</InputAdornment>}
              />
            </FormControl>
            <TextField
              fullWidth
              value={data.company}
              required
              onChange={handleChange}
              label="Nom de l'entreprise"
              name="company"
              color="secondary"
            />
            <FormControl fullWidth>
              <InputLabel required color="secondary" htmlFor="contribution">
                Montant de vos charge sociales
              </InputLabel>
              <Input
                id="contribution"
                value={data.contribution}
                color="secondary"
                name="contribution"
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">€</InputAdornment>}
              />
            </FormControl>
            <TextField
              margin="dense"
              fullWidth
              id="date"
              onChange={handleChange}
              color="secondary"
              label="Date salaire (1er jour du mois)"
              type="date"
              defaultValue={data.date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DropZone></DropZone>
          </form>
        </div>
      </Grow>
    </Modal>
  );
};

export default FormModal;
