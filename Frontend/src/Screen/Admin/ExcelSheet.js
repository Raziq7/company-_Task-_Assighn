import React, { forwardRef, useEffect, useState } from "react";
import { Box, Container, Input, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import ForExcelSheet from "../../component/ExcelSheet/ForExcelSheet";
import { excelSheetAddAction } from "../../action/adminAction";

const profileInfo = React.createContext({});
const Wraper = {
  backgroundColor: "#fff",
  padding: 10,
  border: 20,
};

const WraperA = {
  padding: 10,
  boxShadow: 3,
  overflow: "hidden",
  width: "auto",
};

function ExcelSheet() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [excel, setExcel] = useState();
  const [excel1, setExcel1] = useState();
  const [excel2, setExcel2] = useState();
  const [excel3, setExcel3] = useState();
  const [excel4, setExcel4] = useState();
  const [excel5, setExcel5] = useState();
  const [excel6, setExcel6] = useState();

  const { userFind } = useSelector((state) => {
    return state.userFindProfile;
  });

  const { imageUpload } = useSelector((state) => {
    return state.imageUploadUser;
  });

  const editProfile = (id) => {
    navigate(`/userHome/editprofile/${id}`);
  };

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Excel Input
  const excelChange = (e) => {
    e.preventDefault();
    dispatch(
      excelSheetAddAction(excel, excel1, excel2, excel3, excel4, excel5, excel6)
    );
  };
  const onHandler = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetName1 = workbook.SheetNames[1];
        const sheetName2 = workbook.SheetNames[2];
        const sheetName3 = workbook.SheetNames[3];
        const sheetName4 = workbook.SheetNames[4];
        const sheetName5 = workbook.SheetNames[5];
        const sheetName6 = workbook.SheetNames[6];

        const worksheet = workbook.Sheets[sheetName];
        const worksheet1 = workbook.Sheets[sheetName1];
        const worksheet2 = workbook.Sheets[sheetName2];
        const worksheet3 = workbook.Sheets[sheetName3];
        const worksheet4 = workbook.Sheets[sheetName4];
        const worksheet5 = workbook.Sheets[sheetName5];
        const worksheet6 = workbook.Sheets[sheetName6];

        const json = xlsx.utils.sheet_to_json(worksheet);
        const json1 = xlsx.utils.sheet_to_json(worksheet1);
        const json2 = xlsx.utils.sheet_to_json(worksheet2);
        const json3 = xlsx.utils.sheet_to_json(worksheet3);
        const json4 = xlsx.utils.sheet_to_json(worksheet4);
        const json5 = xlsx.utils.sheet_to_json(worksheet5);
        const json6 = xlsx.utils.sheet_to_json(worksheet6);

        setExcel(json);
        setExcel1(json1);
        setExcel2(json2);
        setExcel3(json3);
        setExcel4(json4);
        setExcel5(json5);
        setExcel6(json6);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <>
      <Box style={WraperA}>
        <Container style={Wraper}>
          {" "}
          <Typography
            style={{
              marginBottom: "20px",
              marginLeft: "60px",
              marginTop: "20px",
              height: "auto",
            }}
            component="h2"
          >
            {" "}
            <h2 style={{ textAlign: "center" }}>Excel</h2>{" "}
          </Typography>
          <div
            style={{
              textAlign: "center",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <form onSubmit={excelChange}>
              <div
                style={{
                  width: "auto",
                  backgroundColor: "white",
                  height: "auto",
                  boxShadow: 7,
                  marginBottom: "10px",
                  borderRadius: "2px",
                  padding: "20px",
                  border: "2px solid black",
                  borderRadius: "25px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h5>Choose Excel</h5>{" "}
                </div>
                <div style={{ display: "block", color: "gray" }}>
                  <Typography align="center" component="h5">
                    {" "}
                    <input
                      type="file"
                      style={{
                        width: "50%",
                        border: "1px solid",
                        label: "Choose Excel",
                        display: "inline-block",
                        border: "1px solid #999",
                        borderRadius: "3px",
                        padding: "5px 8px",
                        outline: "none",
                        WhiteSpace: "nowrap",
                        webkitUserSelect: "none",
                        cursor: "pointer",
                        textShadow: "1px 1px #fff",
                        fontWeight: "700",
                        fontSize: "10pt",
                      }}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={(e) => {
                        onHandler(e);
                      }}
                    />
                  </Typography>
                </div>

                <button
                  style={{
                    backgroundColor: "#5D5CDE",
                    border: "none",
                    borderRadius: "5px",
                    color: "#fff",
                    width: "50%",
                    padding: "20px",
                    fontFamily: "sans-serif",
                    marginTop: "10px",
                  }}
                  type="submit"
                >
                  Upload a Excel
                </button>
              </div>
            </form>
          </div>
        </Container>
        <ForExcelSheet />
      </Box>

      {/* Modal image */}

      {userFind && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={userFind.image}
                alt="chosen"
                style={{ width: "100%", height: "auto" }}
              />
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default ExcelSheet;
