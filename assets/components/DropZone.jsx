import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";

const DropZone = () => {
  const [pdf, setPdf] = useState([]);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: ".pdf",
    maxFiles: 1,
    maxSize: 5242880,
    onDropAccepted: onDrop,
    onDropRejected: onReject,
  });

  function onDrop(acceptedFiles) {
    console.log(acceptedFiles);
  }

  function onReject(file) {
    let error = file[0].errors[0].code;
    let name = file[0].file.name;
    if (error === "file-invalid-type") {
      toast.error(name + " n'est pas un fichier pdf");
    } else if (error === "file-too-large") {
      toast.error(name + " est trop volumineux");
    } else {
      toast.error("Erreur dans l'upload");
    }
  }

  return (
    <form>
      <section className="container_drop">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Deposer votre feuille de salaire</p>
          <em>Seul les fichier *.pdf sont acceptes</em>
        </div>
      </section>
    </form>
  );
};

export default DropZone;
