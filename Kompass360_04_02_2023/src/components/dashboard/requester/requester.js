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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Button } from "@mui/material";
import { Modes } from "../../common/Constants/Modes";
import routeNames from "../../../routes/routeName";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API_BASE_URL}Requester/getallRequesters`;

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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "internalMessage",
    numeric: true,
    disablePadding: false,
    label: "Internal Message For Office",
  },
  {
    id: "customerTypeName",
    numeric: true,
    disablePadding: false,
    label: "Customer Type",
  },
  {
    id: "bcNumber",
    numeric: true,
    disablePadding: false,
    label: "BC Number",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "town",
    numeric: true,
    disablePadding: false,
    label: "Town",
  },
  {
    id: "contact",
    numeric: true,
    disablePadding: false,
    label: "Contact",
  },
  {
    id: "telephone",
    numeric: true,
    disablePadding: false,
    label: "Telephone",
  },
  {
    id: "zipcode",
    numeric: true,
    disablePadding: false,
    label: "ZIP Code",
  },
  // {
  //   id: "country",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Country",
  // },
  {
    id: "billingMethodName",
    numeric: true,
    disablePadding: false,
    label: "Billing Method",
  },
  {
    id: "customerLibraryUrl",
    numeric: true,
    disablePadding: false,
    label: "Customer Library URL",
  },
  {
    id: "reportNameLogic",
    numeric: true,
    disablePadding: false,
    label: "Report Name Logic",
  },
  {
    id: "notificationLetterTemplateUrl",
    numeric: true,
    disablePadding: false,
    label: "Notification Letter Template URL",
  },
  {
    id: "agreementWithCustomer",
    numeric: true,
    disablePadding: false,
    label: "Aggrement With Customer",
  },
  {
    id: "bookkeepingEmail",
    numeric: true,
    disablePadding: false,
    label: "E-Mail-bookkeeping",
  },
  {
    id: "billingNumber",
    numeric: true,
    disablePadding: false,
    label: "Billing Number",
  },

  // {
  //   id: "customerLibraryText",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Customer Library Text",
  // },
  // {
  //   id: "customerGroupID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Customer Group ID",
  // },

  // {
  //   id: "notificationLetterTemplateText",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Notification Letter Template Text",
  // },
  // {
  //   id: "testCoulmn",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Test Coulmn",
  // },

  // {
  //   id: "attachedFiles",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Attach Files",
  // },
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
        Requester
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
      if (!ele.name) ele.name = "";
      if (!ele.address) ele.address = "";
      if (!ele.town) ele.town = "";
      if (!ele.contact) ele.contact = "";
      if (!ele.telephone) ele.telephone = "";
      if (!ele.zipcode) ele.zipcode = "";
      if (!ele.country) ele.country = "";
      if (!ele.bookkeepingEmail) ele.bookkeepingEmail = "";
      if (!ele.billingNumber) ele.billingNumber = "";
      if (!ele.bcNumber) ele.bcNumber = "";
      if (!ele.customerTypeName) ele.customerTypeName = "";
      if (!ele.billingMethodName) ele.billingMethodName = "";
      if (!ele.customerLibraryUrl) ele.customerLibraryUrl = "";
      if (!ele.reportNameLogic) ele.reportNameLogic = "";
      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.name.toLowerCase().includes(lsearchText) ||
        x.address.toLowerCase().includes(lsearchText) ||
        x.town.toLowerCase().includes(lsearchText) ||
        x.country.toLowerCase().includes(lsearchText) ||
        x.bookkeepingEmail.toLowerCase().includes(lsearchText) ||
        x.customerTypeName.toLowerCase().includes(lsearchText) ||
        x.billingMethodName.toLowerCase().includes(lsearchText) ||
        x.customerLibraryUrl.toLowerCase().includes(lsearchText) ||
        x.reportNameLogic.toLowerCase().includes(lsearchText) ||
        x.contact.includes(lsearchText) ||
        x.telephone.includes(lsearchText) ||
        x.bcNumber.includes(lsearchText) ||
        x.zipcode.includes(lsearchText) ||
        x.billingNumber.includes(lsearchText)
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleModal = async (id) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Requester/GetRequesterByID?RequesterID=${id}`
    );
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        requesterData: result.data,
      },
    };
    navigate(routeNames.CREATEREQUESTER, option);
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

  const deleteCase = (requesterID) => {
    Swal.fire({
      title: "Do You Want To Delete?",
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Ok",
      //denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}Requester/DeleteRequester?RequesterID=${requesterID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("record not deleted.");
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
            navigate(routeNames.CREATEREQUESTER, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add Requester
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
                      onClick={(event) => handleClick(event, row.requesterID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.requesterID}
                      selected={isItemSelected}
                    >
                      <TableCell align="centre">{row.name}</TableCell>
                      <TableCell align="centre">
                        {row.internalMessage}
                      </TableCell>
                      <TableCell align="centre">
                        {row.customerTypeName}
                      </TableCell>
                      <TableCell align="centre">{row.bcNumber}</TableCell>
                      <TableCell align="centre">{row.address}</TableCell>
                      <TableCell align="centre">{row.town}</TableCell>
                      <TableCell align="centre">{row.contact}</TableCell>
                      <TableCell align="centre">{row.telephone}</TableCell>
                      <TableCell align="centre">{row.zipcode}</TableCell>
                      <TableCell align="centre">
                        {row.billingMethodName}
                      </TableCell>
                      <TableCell align="centre">
                        {row.customerLibraryUrl}
                      </TableCell>
                      <TableCell align="centre">
                        {row.reportNameLogic}
                      </TableCell>
                      <TableCell align="centre">
                        {row.notificationLetterTemplateUrl}
                      </TableCell>
                      <TableCell align="centre">
                        {row.agreementWithCustomer}
                      </TableCell>
                      <TableCell align="centre">
                        {row.bookkeepingEmail}
                      </TableCell>
                      <TableCell align="centre">{row.billingNumber}</TableCell>

                      {/*  <TableCell align="centre">{row.country}</TableCell>

                      <TableCell align="centre">
                        {row.customerLibraryText}
                      </TableCell>
                      <TableCell align="centre">
                        {row.customerGroupID}
                      </TableCell>
                      <TableCell align="centre">
                        {row.notificationLetterTemplateText}
                      </TableCell>
                     
                       <TableCell align="centre">{row.attachedFiles}</TableCell>*/}

                      <TableCell>
                        {" "}
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
                              onClick={() => handleModal(row.requesterID)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <button
                            className="btn
                          btn-danger btn-sm"
                            style={{ margin: 3 }}
                            onClick={() => deleteCase(row.requesterID)}
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
