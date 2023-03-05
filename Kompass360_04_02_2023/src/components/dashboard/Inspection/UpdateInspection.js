import React, { useEffect, useState } from "react";
import axios from "axios";
import Createinspection from "./CreateInspection";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateInspection({ inspectionID }) {
  const [inspectionData, setInspectionData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Inspection/GetInspectionByID?InspectionID=${inspectionID}`
      )
      .then((response) => {
        // console.log(response.data);
        setInspectionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <createInspection
          mode={Modes.edit}
          inspectionData={inspectionData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
