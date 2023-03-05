import React, { useEffect, useState } from "react";
import axios from "axios";

import { Modes } from "../../common/Constants/Modes";
import Createinspectiontype from "./createinspection";

export default function UpdateInspectionType({ inspectionTypeID }) {
  const [inspectionTypeData, setInspectionTypeData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Inspectiontype/GetInspectionTypeByID?InspectionTypeID=${inspectionTypeID}`
      )
      .then((response) => {
        // console.log(response.data);
        setInspectionTypeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <Createinspectiontype
          mode={Modes.edit}
          inspectionTypeData={inspectionTypeData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
