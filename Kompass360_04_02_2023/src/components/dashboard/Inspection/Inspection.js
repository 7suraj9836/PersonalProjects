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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Button } from "@mui/material";
import { Modes } from "../../common/Constants/Modes";
import routeNames from "../../../routes/routeName";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API_BASE_URL}inspection/getallinspections`;

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: "serial_number",
    numeric: false,
    disablePadding: true,
    label: "Serial Number",
  },
  {
    id: "case",
    numeric: true,
    disablePadding: false,
    label: "Case",
  },
  {
    id: "subject_id_no",
    numeric: true,
    disablePadding: false,
    label: "Subject Id No.",
  },
  {
    id: "inspection_type",
    numeric: true,
    disablePadding: false,
    label: "Inspection Type",
  },
  {
    id: "inspection_result",
    numeric: true,
    disablePadding: false,
    label: "Inspection Result",
  },
  {
    id: "date_of_inspection",
    numeric: true,
    disablePadding: false,
    label: "Date of Inspection",
  },
  {
    id: "inspection_responsible",
    numeric: true,
    disablePadding: false,
    label: "Inspection Responsible",
  },
  {
    id: "inspection_id",
    numeric: true,
    disablePadding: false,
    label: "Inspection Id",
  },
  {
    id: "number_of_child_elements",
    numeric: true,
    disablePadding: false,
    label: "Number of Child Elements",
  },
  {
    id: "additional_req_no",
    numeric: true,
    disablePadding: false,
    label: "Additional Req. No.",
  },
  {
    id: "scheduled_inspection_date",
    numeric: true,
    disablePadding: false,
    label: "Scheduled Inspection Date",
  },
  {
    id: "billing_method",
    numeric: true,
    disablePadding: false,
    label: "Billing Method",
  },
  {
    id: "inspection_report_sent_to",
    numeric: true,
    disablePadding: false,
    label: "Inspection Report is Sent to",
  },
  {
    id: "notification_letter_sent_to_customer",
    numeric: true,
    disablePadding: false,
    label: "Notification Letter - Sent to customer",
  },
  {
    id: "notification_letter_status",
    numeric: true,
    disablePadding: false,
    label: "Notification Letter status",
  },
  {
    id: "notice_letter_issued_date",
    numeric: true,
    disablePadding: false,
    label: "Notice Letter Issued date",
  },
  {
    id: "changed_by",
    numeric: true,
    disablePadding: false,
    label: "Changed By",
  },
  {
    id: "installation_address",
    numeric: true,
    disablePadding: false,
    label: "Installation Address",
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            sx={{ minwidth: "200px" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
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
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : ( */}
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Inspection
      </Typography>
      {/* )} */}
      {/* 
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const inspectionResponsibles = [
  { id: 1, name: "AEN" },
  { id: 2, name: "AGJ" },
  { id: 3, name: "AH" },
  { id: 4, name: "AMD" },
];

const notificationLetterStatuses = [
  { id: 1, name: "Dispatched" },
  { id: 2, name: "Not Shipped" },
];

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
      if (!ele.serialNumber) ele.serialNumber = "";

      // if (!ele.subjectID) ele.subjectID = 0;
      if (!ele.inspectionType) ele.inspectionType = "";
      if (!ele.inspectionResultName) ele.inspectionResultName = "";
      // if (!ele.latestInspectionResult) ele.latestInspectionResult = "";
      // //if (!ele.scheduledInspectionDate) ele.scheduledInspectionDate = null;
      if (!ele.inspectionResponsibleName) ele.inspectionResponsibleName = "";
      if (!ele.additionalNo) ele.additionalNo = "";
      if (!ele.billingMethodName) ele.billingMethodName = "";
      if (!ele.installationAddress) ele.installationAddress = "";
      if (!ele.inspectionReportSentTo) ele.inspectionReportSentTo = "";
      // if (!ele.lastInspectionDate) ele.nextVisionTest = "";

      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.serialNumber.toLowerCase().includes(lsearchText) ||
        // x.caseID.includes(searchValue)
        // x.subjectID.includes(lsearchText)||
        x.inspectionType.toLowerCase().includes(lsearchText) ||
        x.inspectionResultName.toLowerCase().includes(lsearchText) ||
        //   x.latestInspectionResult.includes(lsearchText) ||
        //   //x.scheduledInspectionDate.toLowerCase().includes(lsearchText) ||
        x.inspectionResponsibleName.toLowerCase().includes(lsearchText) ||
        x.additionalNo.toLowerCase().includes(lsearchText) ||
        x.billingMethodName.toLowerCase().includes(lsearchText) ||
        x.installationAddress.toLowerCase().includes(lsearchText) ||
        x.inspectionReportSentTo.toLowerCase().includes(lsearchText)
      // // x.lastInspectionDate.toLowerCase().includes(lsearchText)
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleModal = async (id) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Inspection/getInspectionByID?InspectionId=${id}`
    );
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        caseData: result.data,
      },
    };
    navigate(routeNames.EDITINSPECTION, option);
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

  const getInspectionResponsbile = (id) => {
    return inspectionResponsibles
      .filter((item) => item.id === id)
      .map((el) => {
        return el.name;
      });
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

  const deleteCase = (inspectionID) => {
    Swal.fire({
      title: "Do You Want To Delete?",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}inspection/deleteInspection?inspectionID=${inspectionID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("Inspection not deleted.");
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
          placeholder="Search Here"
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
            navigate(routeNames.CREATEINSPECTION, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add Inspection
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
                      onClick={(event) => handleClick(event, row.inspectionID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.inspectionID}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.serialNumber}
                      </TableCell>
                      <TableCell align="right">{row.caseID}</TableCell>
                      <TableCell align="right">{row.subjectID}</TableCell>
                      <TableCell align="right">{row.inspectionType}</TableCell>
                      <TableCell align="right">
                        {row.inspectionResultName}
                      </TableCell>
                      <TableCell align="right">
                        {moment(row.inspectionDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {getInspectionResponsbile(row.inspectionResponsibleID)}
                      </TableCell>
                      <TableCell align="right">{row.inspectionID}</TableCell>
                      <TableCell align="right">
                        {row.inspectionID}
                      </TableCell>{" "}
                      {/* data not available in api */}
                      <TableCell align="right">{row.additionalNo}</TableCell>
                      <TableCell align="right">
                        {moment(row.scheduledInspectionDate).format(
                          "DD-MM-YYYY"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.billingMethodName}
                      </TableCell>
                      <TableCell align="right">
                        {row.inspectionReportSentTo}
                      </TableCell>
                      <TableCell align="right">
                        {row.notificationLetterSendToCustomer ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">
                        {row.notificationLetterStatusName}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "100px" }}>
                        {moment(row.noticeLetterIssuedDate).format(
                          "DD-MM-YYYY"
                        )}
                      </TableCell>
                      <TableCell align="right">{row.inspectionID}</TableCell>
                      {/* data not available in api */}
                      <TableCell align="right">
                        {row.installationAddress}
                      </TableCell>
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
                              onClick={() => handleModal(row.inspectionID)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <button
                            className="btn
                          btn-danger btn-sm"
                            style={{ margin: 3 }}
                            onClick={() => deleteCase(row.inspectionID)}
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
