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
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useState, useEffect } from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const API = `${process.env.REACT_APP_API_BASE_URL}case/getallcases`;

// console.log(process.env.API_BASE_URL);

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
    id: "number",
    numeric: true,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "requester",
    numeric: true,
    disablePadding: false,
    label: "Requester",
  },
  // {
  //   id: "aggrement_with_the_customer",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Aggrement With The Customer ",
  // },
  {
    id: "pays",
    numeric: true,
    disablePadding: false,
    label: "Pays",
  },
  {
    id: "department_by_payer",
    numeric: true,
    disablePadding: false,
    label: "Department By Payer",
  },
  {
    id: "case_manager",
    numeric: true,
    disablePadding: false,
    label: "Case Manager",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "contact_no_matter",
    numeric: true,
    disablePadding: false,
    label: "Contact No.-Matter",
  },
  {
    id: "external_attachement_no",
    numeric: true,
    disablePadding: false,
    label: "External Attachement No.",
  },
  {
    id: "accounting_status",
    numeric: true,
    disablePadding: false,
    label: "Accounting Status",
  },
  {
    id: "invoiced",
    numeric: true,
    disablePadding: false,
    label: "Invoiced",
  },
  {
    id: "Contact_no_reports",
    numeric: true,
    disablePadding: false,
    label: "Contact No._Reports",
  },
  {
    id: "ordered_by",
    numeric: true,
    disablePadding: false,
    label: "Odered By",
  },
  {
    id: "contact_no_warning",
    numeric: true,
    disablePadding: false,
    label: "Contact No.-Warnning",
  },
  {
    id: "invoice_text",
    numeric: true,
    disablePadding: false,
    label: "Invoice Text/Serial Number",
  },
  {
    id: "other_description",
    numeric: true,
    disablePadding: false,
    label: "Other description",
  },
  {
    id: "planed_inspection_date",
    numeric: true,
    disablePadding: false,
    label: "Planned Inspection Date",
  },

  {
    id: "work_description",
    numeric: true,
    disablePadding: false,
    label: "Work Description(Message Between Planner and Inspector)",
  },

  {
    id: "bookkeeping_message",
    numeric: true,
    disablePadding: false,
    label: "Bookkeeping Message",
  },
  {
    id: "billing_method",
    numeric: true,
    disablePadding: false,
    label: "Billing_Method",
  },
  {
    id: "report_email_to_customer",
    numeric: true,
    disablePadding: false,
    label: "Report Email To Customer",
  },
  {
    id: "topics_include_of_the_case",
    numeric: true,
    disablePadding: false,
    label: "Topics Include Of The Case",
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
            key={headCell.id}
            align={headCell.numeric ? "centre" : "centre"}
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
        Case
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

// const departmentByPayer = [
//   { id: 1, name: "departmentByPayer One" },
//   { id: 2, name: "departmentByPayer Two" },
//   { id: 3, name: "departmentByPayer Three" },
//   { id: 4, name: "departmentByPayer Four" },
// ];

// const contactNoMatters = [
//   { id: 1, name: "contactNoMatter One" },
//   { id: 2, name: "contactNoMatter Two" },
//   { id: 3, name: "contactNoMatter Three" },
//   { id: 4, name: "contactNoMatter Four" },
// ];
// const contactNoWarning = [
//   { id: 1, name: "contactNoWarning One" },
//   { id: 2, name: "contactNoWarning Two" },
//   { id: 3, name: "contactNoWarning Three" },
//   { id: 4, name: "contactNoWarning Four" },
// ];
// const contactNoReports = [
//   { id: 1, name: "contactNoReport One" },
//   { id: 2, name: "contactNoReport Two" },
//   { id: 3, name: "contactNoReport Three" },
//   { id: 4, name: "contactNoReport Four" },
// ];

// const notificationLetterStatuses = [
//   { id: 1, name: "Dispatched" },
//   { id: 2, name: "Not Shipped" },
// ];

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

  const [searchValue, setSearchValue] = useState("");
  const [baseApiData, setBaseApiData] = useState([]);

  useEffect(() => {
    let tempData = baseApiData.map((ele) => {
      if (!ele.description) ele.description = "";
      if (!ele.number) ele.number = "";
      if (!ele.requesterName) ele.requesterName = "";
      if (!ele.agreement) ele.agreement = "";
      if (!ele.paysName) ele.paysName = "";
      if (!ele.departmentByPayer) ele.departmentByPayer = "";
      if (!ele.caseManagerName) ele.caseManagerName = "";
      if (!ele.statusName) ele.statusName = "";
      if (!ele.contactNoMatter) ele.contactNoMatter = "";
      if (!ele.externalAttachmentNo) ele.externalAttachmentNo = "";
      if (!ele.accountingStatusName) ele.accountingStatusName = "";

      if (!ele.contactNoReports) ele.contactNoReports = "";
      if (!ele.orderedBy) ele.orderedBy = "";
      if (!ele.contactNoWarning) ele.contactNoWarning = "";
      if (!ele.invoiceText) ele.invoiceText = "";
      if (!ele.otherDescription) ele.otherDescription = "";
      if (!ele.plannedInspectionDate) ele.plannedInspectionDate = "";
      if (!ele.workDescription) ele.workDescription = "";
      if (!ele.bookkeepingMessage) ele.bookkeepingMessage = "";
      if (!ele.billingMethodName) ele.billingMethodName = "";
      if (!ele.reportEmail) ele.reportEmail = "";
      if (!ele.topicsInCase) ele.topicsInCase = "";
      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.requesterName.toLowerCase().includes(lsearchText) ||
        x.description.toLowerCase().includes(lsearchText) ||
        x.agreement.toLowerCase().includes(lsearchText) ||
        x.paysName.toLowerCase().includes(lsearchText) ||
        x.departmentByPayer.toLowerCase().includes(lsearchText) ||
        x.caseManagerName.toLowerCase().includes(lsearchText) ||
        x.statusName.toLowerCase().includes(lsearchText) ||
        x.contactNoMatter.toLowerCase().includes(lsearchText) ||
        x.accountingStatusName.toLowerCase().includes(lsearchText) ||
        x.contactNoReports.toLowerCase().includes(lsearchText) ||
        x.orderedBy.toLowerCase().includes(lsearchText) ||
        x.contactNoWarning.toLowerCase().includes(lsearchText) ||
        x.invoiceText.toLowerCase().includes(lsearchText) ||
        x.otherDescription.toLowerCase().includes(lsearchText) ||
        x.plannedInspectionDate.toLowerCase().includes(lsearchText) ||
        x.bookkeepingMessage.toLowerCase().includes(lsearchText) ||
        x.billingMethodName.toLowerCase().includes(lsearchText) ||
        x.reportEmail.toLowerCase().includes(lsearchText) ||
        x.topicsInCase.toLowerCase().includes(lsearchText) ||
        x.number.includes(lsearchText) ||
        x.externalAttachmentNo.includes(lsearchText)
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleModal = async (id) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Case/getCaseByID?CaseID=${id}`
    );
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        caseData: result.data,
      },
    };
    navigate(routeNames.EDITCASE, option);
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

  const deleteCase = (caseID) => {
    Swal.fire({
      title: "Should be Are You Sure Want To Delete?",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}case/deleteCase?caseID=${caseID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("Case not deleted");
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
            navigate(routeNames.CREATECASE, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add Case
        </button>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
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
                      onClick={(event) => handleClick(event, row.caseID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.caseID}
                      selected={isItemSelected}
                    >
                      <TableCell align="centre">{row.number}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="centre">{row.requesterName}</TableCell>
                      {/*<TableCell align="centre">{row.agreement}</TableCell>*/}
                      <TableCell align="centre">{row.paysName}</TableCell>
                      <TableCell align="centre">
                        {row.departmentByPayer}
                      </TableCell>
                      <TableCell align="centre">
                        {row.caseManagerName}
                      </TableCell>
                      <TableCell align="centre">{row.statusName}</TableCell>
                      <TableCell align="centre">
                        {row.contactNoMatter}
                      </TableCell>
                      <TableCell align="centre">
                        {row.externalAttachmentNo}
                      </TableCell>
                      <TableCell align="centre">
                        {row.accountingStatusName}
                      </TableCell>
                      <TableCell align="centre">
                        {row.isInvoiced ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="centre">
                        {row.contactNoReports}
                      </TableCell>
                      <TableCell align="centre">{row.orderedBy}</TableCell>
                      <TableCell align="centre">
                        {row.contactNoWarning}
                      </TableCell>
                      <TableCell align="centre">{row.invoiceText}</TableCell>
                      <TableCell align="centre">
                        {row.otherDescription}
                      </TableCell>
                      {/* data not available in api */}
                      <TableCell align="centre">
                        {moment(row.plannedInspectionDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="centre">
                        {row.workDescription}
                      </TableCell>
                      <TableCell align="centre">
                        {row.bookkeepingMessage}
                      </TableCell>
                      <TableCell align="centre">
                        {row.billingMethodName}
                      </TableCell>
                      <TableCell align="centre">{row.reportEmail}</TableCell>
                      <TableCell align="centre">{row.topicsInCase}</TableCell>
                      <TableCell>
                        <div style={{ display: "flex" }}>
                          <div className="Edit">
                            <button
                              className="btn
                          btn-primary btn-sm text-center"
                              style={{
                                padding: 4,
                                marginright: 3,
                                marginLeft: 3,
                                paddingleft: 5,
                                paddingright: 5,
                                margin: 3,
                                marginTop: 1.25,
                              }}
                              onClick={() => handleModal(row.caseID)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <div className="delete">
                            <button
                              className="btn
                          btn-danger btn-sm"
                              onClick={() => deleteCase(row.caseID)}
                            >
                              <DeleteTwoToneIcon />
                            </button>
                          </div>
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
