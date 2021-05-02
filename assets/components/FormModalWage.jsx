import {
  Backdrop,
  Button,
  FormControl,
  Grow,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import WageApi from "../services/WageApi";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";

const FormModal = ({
  open,
  setOpen,
  title,
  fetchWage,
  editing,
  id,
  setEditing,
}) => {
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
    if (editing) {
      try {
        await WageApi.update(id, data);
        toast.success("Fiche de salaire modifiée");
        setEditing(false);
        setOpen(false);
        setData([]);
        fetchWage();
      } catch (error) {
        toast.error("probleme lors de la modicfication de la fiche de salaire");
      }
    } else {
      try {
        await WageApi.create(data);
        toast.success("Fiche de salaire créé");
        setOpen(false);
        fetchWage();
      } catch ({ response }) {
        const violation = response.data.violations;
        if (violation) {
          const apiErrors = {};
          violation.forEach(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setErrors(apiErrors);
          toast.error("Des erreurs dans votre formulaire !");
        }
      }
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setData({ ...data, [name]: value });
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
  };
  const handleOpen = async () => {
    if (editing) {
      try {
        const {
          Amount,
          company,
          contributions,
          month,
          year,
        } = await WageApi.find(id);
        setData({ Amount, company, contributions, month, year });
      } catch (error) {
        toast.error("impossible de recuperer la fiche de salaire");
      }
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onRendered={handleOpen}
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
            {editing ? (
              <h2 className="transition-modal-title">Modification {title}</h2>
            ) : (
              <h2 className="transition-modal-title">Nouvelle {title}</h2>
            )}

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                {errors.Amount ? (
                  <TextField
                    error
                    helperText={errors.Amount}
                    id="Amount"
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                    name="year"
                    onChange={handleChange}
                    label="Année du salaire"
                  />
                ) : (
                  <TextField
                    id="year"
                    value={data.year}
                    color="secondary"
                    required
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
                Enregistrer
              </Button>
            </form>
          </div>
        </div>
      </Grow>
    </Modal>
  );
};

export default FormModal;
