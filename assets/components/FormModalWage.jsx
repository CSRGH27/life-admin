import {
  Backdrop,
  Button,
  FormControl,
  Grow,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import { CloudUploadOutlined } from "@material-ui/icons";
import React, { useState } from "react";
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
  const handleSubmit = () => {};
  const handleChange = () => {};
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
              defaultValue="2017-05-24"
              value={data.data}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              variant="contained"
              color="secondary"
              component="label"
              startIcon={<CloudUploadOutlined />}
              style={{ marginTop: "20px" }}
            >
              Upload
              <input type="file" hidden />
            </Button>
          </form>
        </div>
      </Grow>
    </Modal>
  );
};

export default FormModal;
