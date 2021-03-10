import React from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ data, setFile }) => {
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
    setFile({
      file: acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    });
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
  );
};

export default DropZone;
