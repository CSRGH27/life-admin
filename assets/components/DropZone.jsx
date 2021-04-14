import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import SaveIcon from "@material-ui/icons/Save";

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
    maxSize: 10485760,
    onDrop: onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  function onDrop(acceptedFiles) {
    console.log(acceptedFiles);
    setPdf(acceptedFiles);
  }
  function handleSubmit() {
    const data = new FormData();
    data.append("file", pdf);
    console.log(data);
  }
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path}
      <ul className="list_error_dropzone">
        {errors.map((e) => (
          <li key={e.code}>
            <em>*{e.message}</em>
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <section className="container_drop">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Deposer votre feuille de salaire</p>
          <em>Seul les fichier *.pdf sont acceptes</em>
        </div>
        <aside>
          <h4 className="dropzone_title">Fichiers acceptés</h4>
          <ul className="list_file_dropzone_check">{files}</ul>
          <h4 className="dropzone_title">Fichiers rejetés</h4>
          <ul className="list_file_dropzone_uncheck">{fileRejectionItems}</ul>
        </aside>
      </section>
      <div className="ctn_btn_form">
        <Button
          type="submit"
          className="button_form"
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default DropZone;
