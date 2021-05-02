import { Create, Delete, Description, GetApp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import AppPageTitle from "../components/AppPageTitle";
import DropZone from "../components/DropZone";
import FormModal from "../components/FormModalWage";
import Sidebar from "../components/Sidebar";
import CardWageLoader from "../loaders/CardWageLoader";
import WageApi from "../services/WageApi";

const WageSlip = ({ history }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [wages, setWages] = useState([]);
  const [filterWage, setFilterWages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");
  const fetchWage = async () => {
    try {
      const data = await WageApi.findAll();
      setWages(data);
      setFilterWages(data);
      setLoading(false);
    } catch (error) {
      toast.error("Impossible de charger les feuilles  de salaire");
    }
  };

  const handleDelete = async (id) => {
    try {
      await WageApi.deleteWage(id);
      fetchWage();
      toast.warning("Fiche de salaire supprimée");
    } catch (error) {
      toast;
    }
  };
  const handleEdit = (id) => {
    setEditing(true);
    setOpen(true);
    setId(id);
  };

  useEffect(() => {
    fetchWage();
  }, []);

  const title = "Fiche de paie";
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="admin_cte">
        <Sidebar history={history}></Sidebar>
        <div className="admin_panel_left">
          <AppPageTitle
            setOpen={setOpen}
            title={title}
            wages={wages}
            setWages={setWages}
            filterWages={filterWage}
            setFilterWages={setFilterWages}
            icon={<Description style={{ fill: "#fff" }} />}
          ></AppPageTitle>
          {!loading ? (
            <div className="ctn_wages">
              {filterWage.map((item) => (
                <div key={item.id} className="card_wage">
                  <div className="card_wage_top">
                    <div className="ctn_name_company">{item.company}</div>
                  </div>
                  <div className="ctn_pdf_wage">
                    {item.fileUrl ? (
                      <Document
                        error="Impossible d'afficher le pdf"
                        file={item.fileUrl}
                      >
                        <Page width={270} pageNumber={1}></Page>
                      </Document>
                    ) : (
                      <DropZone id={item.id} fetchWage={fetchWage} />
                    )}
                  </div>
                  <div className="ctn_info_wage">
                    <div className="line_info">
                      <h3>Salaire: </h3>
                      <div className="badge_salaire">{item.Amount} €</div>
                    </div>
                    <div className="line_info">
                      <h3>Taxes: </h3>
                      <div className="badge_tax">{item.contributions} €</div>
                    </div>
                    <div className="line_info">
                      <h3>date: </h3>
                      <div className="badge_tax">
                        {item.month}/{item.year}
                      </div>
                    </div>
                  </div>
                  <div className="ctn_wage_action">
                    <div
                      onClick={() => handleDelete(item.id)}
                      className="icon_delete"
                    >
                      <Delete />
                    </div>
                    <div
                      onClick={() => handleEdit(item.id)}
                      className="icon_modify"
                    >
                      <Create />
                    </div>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={item.fileUrl}
                      className="icon_download"
                    >
                      <GetApp />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ctn_loader_wage">
              <CardWageLoader />
            </div>
          )}
          <FormModal
            id={id}
            setEditing={setEditing}
            editing={editing}
            fetchWage={fetchWage}
            history={history}
            title={title}
            setOpen={setOpen}
            open={open}
          ></FormModal>
        </div>
      </div>
    </>
  );
};

export default WageSlip;
