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
import { useState, useEffect } from "react";
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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API_BASE_URL}User/GetAllUsers`;

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
    id: "userID",
    numeric: false,
    disablePadding: true,
    label: "User ID",
    align: "center",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "shownName",
    numeric: true,
    disablePadding: false,
    label: "Shown Name",
  },
  {
    id: "userName",
    numeric: true,
    disablePadding: false,
    label: "User Name",
  },
  {
    id: "domains",
    numeric: true,
    disablePadding: false,
    label: "Domains",
  },
  {
    id: "emailId",
    numeric: true,
    disablePadding: false,
    label: "Email ID",
  },
  {
    id: "positions",
    numeric: true,
    disablePadding: false,
    label: "Positions",
  },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "occupation",
    numeric: true,
    disablePadding: false,
    label: "Occupation",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "faxNo",
    numeric: true,
    disablePadding: false,
    label: "FAX No",
  },
  {
    id: "cellphone",
    numeric: true,
    disablePadding: false,
    label: "Cell Phone",
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
    id: "State",
    numeric: true,
    disablePadding: false,
    label: "State",
  },
  {
    id: "zipcode",
    numeric: true,
    disablePadding: false,
    label: "ZIP Code",
  },
  {
    id: "country",
    numeric: true,
    disablePadding: false,
    label: "Country",
  },
  {
    id: "userLevelName",
    numeric: true,
    disablePadding: false,
    label: "User Level Name",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
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
        User
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [isError, setIsError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({});
  const [searchValue, setSearchValue] = useState("");
  const [baseApiData, setBaseApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let tempData = baseApiData.map((ele) => {
      if (!ele.userID) ele.userID = "";
      if (!ele.firstname) ele.firstname = "";
      if (!ele.username) ele.username = "";
      if (!ele.emailID) ele.emailID = "";
      if (!ele.department) ele.department = "";
      if (!ele.position) ele.position = "";
      if (!ele.address) ele.address = "";
      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.userID.toLowerCase().includes(lsearchText) ||
        x.firstname.toLowerCase().includes(lsearchText) ||
        x.username.toLowerCase().includes(lsearchText) ||
        x.emailID.includes(lsearchText) ||
        x.department.toLowerCase().includes(lsearchText) ||
        x.position.toLowerCase().includes(lsearchText) ||
        x.address.toLowerCase().includes(lsearchText) ||
        x.department.filter((e) => e.name.toLowerCase().includes(lsearchText))
          .length > 0
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleModal = async (id) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}User/GetUserByID?UserID=${id}`
    );
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        userData: result.data,
      },
    };
    navigate(routeNames.CREATETERRITORY, option);
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

  const deleteCase = (userID) => {
    Swal.fire({
      title: "Should be Are You Sure Want To Delete?",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}User/DeleteUser?UserID=${userID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("User not deleted.");
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
            navigate(routeNames.CREATETERRITORY, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add User
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
                      onClick={(event) => handleClick(event, row.userID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.userID}
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
                      {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.serialNumber}
                      </TableCell> */}
                      <TableCell align="center">{row.userID}</TableCell>
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.shownname}</TableCell>
                      {/* data not available in api */}
                      <TableCell align="center">{row.username}</TableCell>
                      {/* <TableCell align="center">{moment(row.scheduledInspectionDate).format("DD-MM-YYYY")}</TableCell> */}
                      <TableCell align="center">{row.domains}</TableCell>
                      <TableCell align="center">{row.emailID}</TableCell>

                      <TableCell align="center">{row.position}</TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                      <TableCell align="center">{row.occupation}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.faxNo}</TableCell>
                      <TableCell align="center">{row.cellphone}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.town}</TableCell>
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="center">{row.country}</TableCell>
                      <TableCell align="center">{row.userLevelID}</TableCell>
                      <TableCell align="center">{row.userLevelName}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>

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
                              onClick={() => handleModal(row.userID)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <button
                            className="btn
                          btn-danger btn-sm"
                            style={{ margin: 3 }}
                            onClick={() => deleteCase(row.userID)}
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
