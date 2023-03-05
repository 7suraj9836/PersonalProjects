import React, { useEffect, useState } from "react";
import axios from "axios";
import Createinspection from "./CreateCase";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateCase({ caseID }) {
  const [caseData, setCaseData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Case/GetCaseByID?CaseID=${caseID}`
      )
      .then((response) => {
        // console.log(response.data);
        setCaseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <createCase
          mode={Modes.edit}
          caseData={caseData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
