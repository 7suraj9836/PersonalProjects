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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useState, useEffect } from "react";
const API = `${process.env.REACT_APP_API_BASE_URL}RequesterDepartment/getallrequesterDepartments`;

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
    numeric: true,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "bCNumber",
    numeric: true,
    disablePadding: false,
    label: "BCNumber",
  },
  {
    id: "gln",
    numeric: true,
    disablePadding: false,
    label: "GLN",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "address2",
    numeric: true,
    disablePadding: false,
    label: "Address2",
  },
  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },
  {
    id: "postalCode",
    numeric: true,
    disablePadding: false,
    label: "PostalCode",
  },
  {
    id: "countryCode",
    numeric: true,
    disablePadding: false,
    label: "CountryCode",
  },
  {
    id: "contact",
    numeric: true,
    disablePadding: false,
    label: "Contact",
  },
  {
    id: "customerNumber",
    numeric: true,
    disablePadding: false,
    label: "CustomerNumber",
  },
  {
    id: "telephone",
    numeric: true,
    disablePadding: false,
    label: "Telephone",
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
            key={headCell.id}
            // align={headCell.numeric ? 'center' : 'left'}
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
        RequesterDepartment
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
  const [searchValue, setSearchValue] = useState("");
  const [baseApiData, setBaseApiData] = useState([]);

  useEffect(() => {
    let tempData = baseApiData.map((ele) => {
      if (!ele.title) ele.title = "";
      if (!ele.bcNumber) ele.bcNumber = "";
      if (!ele.gln) ele.gln = "";
      if (!ele.address) ele.address = "";
      if (!ele.address2) ele.address2 = "";
      if (!ele.city) ele.city = "";
      if (!ele.postalCode) ele.postalCode = "";
      if (!ele.countryCode) ele.countryCode = "";
      if (!ele.contact) ele.contact = "";
      if (!ele.customerNumber) ele.customerNumber = "";
      if (!ele.telephone) ele.telephone = "";
      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.title.toLowerCase().includes(lsearchText) ||
        x.address.toLowerCase().includes(lsearchText) ||
        x.address2.toLowerCase().includes(lsearchText) ||
        x.city.toLowerCase().includes(lsearchText) ||
        x.bcNumber.includes(lsearchText) ||
        x.gln.includes(lsearchText) ||
        x.postalCode.includes(lsearchText) ||
        x.countryCode.includes(lsearchText) ||
        x.contact.includes(lsearchText) ||
        x.customerNumber.includes(lsearchText) ||
        x.telephone.includes(lsearchText)
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleModal = async (departmentID) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}RequesterDepartment/getRequesterDepartmentByID?departmentID=${departmentID}`
    );
    console.log(departmentID);
    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        departmentData: result.data,
      },
    };
    navigate(routeNames.CREATEREQUESTERDEPARTMENT, option);
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
  const DeleteRequesterDepartment = (departmentID) => {
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
            `${process.env.REACT_APP_API_BASE_URL}RequesterDepartment/DeleteRequesterDepartment?departmentID=${departmentID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("Department not deleted.");
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
            navigate(routeNames.CREATEREQUESTERDEPARTMENT, {
              state: { mode: Modes.create },
              replace: true,
            })
          }
        >
          Add Requester Department
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
                      onClick={(event) => handleClick(event, row.departmentID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.departmentID}
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
                      align='center'
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.caseManagerID}
                      </TableCell> */}
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>

                      <TableCell align="center">{row.bcNumber}</TableCell>
                      <TableCell align="center">{row.gln}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.address2}</TableCell>
                      <TableCell align="center">{row.city}</TableCell>
                      <TableCell align="center">{row.postalCode}</TableCell>
                      <TableCell align="center">{row.countryCode}</TableCell>

                      <TableCell align="center">{row.contact}</TableCell>
                      <TableCell align="center">{row.customerNumber}</TableCell>
                      <TableCell align="center">{row.telephone}</TableCell>

                      <TableCell>
                        <button
                          className="btn
                          btn-primary btn-xxl"
                          style={{
                            padding: 4,
                            marginright: 3,
                            marginLeft: 3,
                            paddingleft: 5,
                            paddingright: 5,
                            margin: 3,
                            marginTop: 1.25,
                          }}
                          onClick={() => handleModal(row.departmentID)}
                        >
                          <EditIcon />
                        </button>

                        <button
                          className="btn
                          btn-danger btn-sm"
                          style={{ margin: 3 }}
                          onClick={() =>
                            DeleteRequesterDepartment(row.departmentID)
                          }
                        >
                          <DeleteTwoToneIcon />
                        </button>
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
