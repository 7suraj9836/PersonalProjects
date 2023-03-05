import React, { useEffect, useState } from "react";
import axios from "axios";
import Createterritory from "./createterritory";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateTerritory({ TerritoryID }) {
  const [territoryData, setTerritoryData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Territory/GetTerritoryByID?TerritoryID=${TerritoryID}`
      )
      .then((response) => {
        // console.log(response.data);
        setTerritoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <Createterritory
          mode={Modes.edit}
          territoryData={territoryData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}