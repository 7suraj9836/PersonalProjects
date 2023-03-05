import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import moment from "moment/moment";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Modes } from "../../common/Constants/Modes";
import routeNames from "../../../routes/routeName";
import { useNavigate } from "react-router-dom";

const API = `${process.env.REACT_APP_API_BASE_URL}InspectionType/GetAllInspectionTypes`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "specificTopicData",
    numeric: true,
    disablePadding: false,
    label: "Specific Topic",
  },
  {
    id: "relatedReportLibraries",
    numeric: true,
    disablePadding: false,
    label: "Related Report",
  },
  {
    id: "subjectTypeData",
    numeric: true,
    disablePadding: false,
    label: "Subject Type",
  },
  {
    id: "territoryID",
    numeric: true,
    disablePadding: false,
    label: "Territory",
  },
  {
    id: "competenceRequirementsData",
    numeric: true,
    disablePadding: false,
    label: "Competence Requerments",
  },
  {
    id: "estimatedTimeConsumption",
    numeric: true,
    disablePadding: false,
    label: "Estimated Time Consumption",
  },

  {
    id: "nextPeriodicInspectionDate",
    numeric: true,
    disablePadding: false,
    label: "Next Periodic Inspection Date",
  },
  {
    id: "reportTemplateName",
    numeric: true,
    disablePadding: false,
    label: "Report Template Name",
  },
  // {
  //   id: "nextInspectionDate",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Next Inspection Date",
  // },
  {
    id: "nextInspectionDate",
    numeric: true,
    disablePadding: false,
    label: "Next Inspection Date",
  },
  {
    id: "nextPressureTestDate",
    numeric: true,
    disablePadding: false,
    label: "Next Pressure Test Date",
  },
  {
    id: "itemNumberBC",
    numeric: true,
    disablePadding: false,
    label: "Item Number For BC",
  },
  {
    id: "nextVisionTest",
    numeric: true,
    disablePadding: false,
    label: "Next vision Test",
  },
  {
    id: "nextCalibrationDate",
    numeric: true,
    disablePadding: false,
    label: "Next Calibration Test",
  },
  {
    id: "nextCertificationDate",
    numeric: true,
    disablePadding: false,
    label: "Next Certification Date",
  },
  {
    id: "nextSigningDate",
    numeric: true,
    disablePadding: false,
    label: "Next Signing Date",
  },
  {
    id: "expirationDate",
    numeric: true,
    disablePadding: false,
    label: "Expiration Date",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="thead-dark table-dark">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ minwidth: "200px" }}
            key={headCell.id}
            // align={headCell.numeric ? "centre" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Inspection Type
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [isError, setIsError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [error, setError] = React.useState({});
  const [searchValue, setSearchValue] = useState("");
  const [baseApiData, setBaseApiData] = useState([]);

  useEffect(() => {
    let tempData = baseApiData.map((ele) => {
      if (!ele.title) ele.title = "";
      if (!ele.specificTopic) ele.specificTopic = "";
      if (!ele.relatedReportLibraries) ele.relatedReportLibraries = "";
      if (!ele.subjectType) ele.subjectType = "";
      if (!ele.territoryName) ele.territoryName = "";
      if (!ele.estimatedTimeConsumption) ele.estimatedTimeConsumption = "";
      if (!ele.nextPeriodicInspectionDate) ele.nextPeriodicInspectionDate = "";
      if (!ele.reportTemplateName) ele.reportTemplateName = "";
      if (!ele.nextInspectionDate) ele.nextInspectionDate = "";
      if (!ele.nextPressureTestDate) ele.nextPressureTestDate = "";
      if (!ele.itemNumberBC) ele.itemNumberBC = "";
      if (!ele.nextCertificationDate) ele.nextCertificationDate = "";
      if (!ele.nextVisionTest) ele.nextVisionTest = "";
      if (!ele.nextCalibrationDate) ele.nextCalibrationDate = "";
      if (!ele.nextSigningDate) ele.nextSigningDate = "";
      if (!ele.expirationDate) ele.expirationDate = "";
      if (!ele.competenceRequirementsData) ele.competenceRequirementsData = [];
      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.title.toLowerCase().includes(lsearchText) ||
        x.specificTopic.toLowerCase().includes(lsearchText) ||
        x.relatedReportLibraries.toLowerCase().includes(lsearchText) ||
        x.subjectType.toLowerCase().includes(lsearchText) ||
        x.territoryName.toLowerCase().includes(lsearchText) ||
        x.estimatedTimeConsumption.toLowerCase().includes(lsearchText) ||
        x.nextPeriodicInspectionDate.toLowerCase().includes(lsearchText) ||
        x.reportTemplateName.toLowerCase().includes(lsearchText) ||
        x.nextInspectionDate.toLowerCase().includes(lsearchText) ||
        x.nextPressureTestDate.toLowerCase().includes(lsearchText) ||
        x.itemNumberBC.toLowerCase().includes(lsearchText) ||
        x.nextCertificationDate.toLowerCase().includes(lsearchText) ||
        x.nextVisionTest.toLowerCase().includes(lsearchText) ||
        x.nextCalibrationDate.toLowerCase().includes(lsearchText) ||
        x.nextSigningDate.toLowerCase().includes(lsearchText) ||
        x.expirationDate.toLowerCase().includes(lsearchText) ||
        x.competenceRequirementsData.filter((e) =>
          e.name.toLowerCase().includes(lsearchText)
        ).length > 0
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleModal = async (id) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}InspectionType/GetInspectionTypeByID?InspectionTypeID=${id}`
    );
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        inspectionTypeData: result.data,
      },
    };
    navigate(routeNames.CREATEINSPECTIONTYPE, option);
  };

  const getApiData = async () => {
    try {
      const res = await axios.get(API);
      setRows(res.data);
      setBaseApiData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  React.useEffect(() => {
    getApiData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const deleteCase = (inspectionTypeID) => {
    Swal.fire({
      title: "Do You Want To Delete?",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}InspectionType/DeleteInspectionType?InspectionTypeID=${inspectionTypeID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("Inspection Type not deleted.");
          });
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <input
          type="text"
          placeholder="Enter search string"
          style={{
            width: "230px",
            height: "48px",
            borderRadius: "20px",
            float: "right",
            textAlign: "center",
          }}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate(routeNames.CREATEINSPECTIONTYPE, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add Inspection Type
        </button>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 900 }}
            aria-labelledby="tableTitle"
            size="medium"
            className="table table-bordered table-light table-striped"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              className="thead-dark table-dark"
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.inspectionTypeID)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.inspectionTypeID}
                      selected={isItemSelected}
                    >
                      <TableCell align="centre">{row.title}</TableCell>
                      <TableCell align="center">
                        {row.specificTopicData.length >= 1
                          ? row.specificTopicData.map((x, index) => {
                              if (index < row.specificTopicData.length - 1)
                                return x.name + ",";
                              else return x.name;
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell align="centre">
                        {row.relatedReportLibraries}
                      </TableCell>
                      <TableCell align="center">
                        {row.subjectTypeData.length >= 1
                          ? row.subjectTypeData.map((x, index) => {
                              if (index < row.subjectTypeData.length - 1)
                                return x.name + ",";
                              else return x.name;
                            })
                          : "N/A"}
                      </TableCell>

                      <TableCell align="centre">{row.territoryName}</TableCell>
                      <TableCell align="center">
                        {row.competenceRequirementsData.length >= 1
                          ? row.competenceRequirementsData.map((x, index) => {
                              if (
                                index <
                                row.competenceRequirementsData.length - 1
                              )
                                return x.name + ",";
                              else return x.name;
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell align="centre">
                        {row.estimatedTimeConsumption}
                      </TableCell>
                      <TableCell align="centre">
                        {moment(row.nextPeriodicInspectionDate).format(
                          "DD-MM-YYYY"
                        )}
                      </TableCell>

                      <TableCell align="centre">
                        {row.reportTemplateName}
                      </TableCell>
                      <TableCell align="centre">
                        {moment(row.nextInspectionDate).format("DD-MM-YYYY")}
                      </TableCell>
                      {/*<TableCell align="centre">
                        {row.nextInspectionDate}
                    </TableCell>*/}
                      <TableCell align="centre">
                        {moment(row.nextPressureTestDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="centre">{row.itemNumberBC}</TableCell>
                      <TableCell align="centre">
                        {moment(row.nextVisionTest).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="centre">
                        {moment(row.nextCalibrationDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="centre">
                        {moment(row.nextCertificationDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="centre">
                        {moment(row.nextSigningDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="centre">
                        {moment(row.expirationDate).format("DD-MM-YYYY")}
                      </TableCell>

                      {/* <TableCell align="centre">{row.attachedFiles}</TableCell>*/}

                      <TableCell>
                        <div style={{ display: "flex" }}>
                          <div className="Edit">
                            <button
                              className="btn
                          btn-primary btn-sm"
                              style={{
                                padding: 4,
                                marginright: 3,
                                marginLeft: 3,
                                paddingleft: 5,
                                paddingright: 5,
                                margin: 3,
                                marginTop: 1.25,
                              }}
                              onClick={() => handleModal(row.inspectionTypeID)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <button
                            className="btn
                          btn-danger btn-sm"
                            style={{ margin: 3 }}
                            onClick={() => deleteCase(row.inspectionTypeID)}
                          >
                            <DeleteTwoToneIcon />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
