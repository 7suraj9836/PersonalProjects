import React, { useEffect, useState } from "react";
import axios from "axios";
// import CreateCaseManager from "./createCaseManager";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateCaseManager({ caseManagerID }) {
  const [caseManagerData, setCaseManagerData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}CaseManager/GetCaseManagerByID?CaseManagerID=${caseManagerID}`
      )
      .then((response) => {
        // console.log(response.data);
        setCaseManagerData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <CreateCaseManager
          mode={Modes.edit}
          caseManagerData={caseManagerData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}