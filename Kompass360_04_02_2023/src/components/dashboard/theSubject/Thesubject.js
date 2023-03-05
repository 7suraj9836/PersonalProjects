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
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Modes } from "../../common/Constants/Modes";
import routeNames from "../../../routes/routeName";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import axios from "axios";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API_BASE_URL}Subject/GetallSubjects`;
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
    id: "requester",
    numeric: true,
    disablePadding: false,
    label: "The Requester",
  },
  {
    id: "scheduled_inspection",
    numeric: true,
    disablePadding: false,
    label: "Scheduled Inspection Date",
  },

  {
    id: "installation Address",
    numeric: true,
    disablePadding: false,
    label: "Installation Address",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "main_area",
    numeric: true,
    disablePadding: false,
    label: "Name Of The Main Area",
  },

  {
    id: "owner",
    numeric: true,
    disablePadding: false,
    label: "Owner",
  },
  {
    id: "latest_inspection",
    numeric: true,
    disablePadding: false,
    label: "Latest Inspection Result",
  },

  {
    id: "contact_person",
    numeric: true,
    disablePadding: false,
    label: "Contact Person",
  },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "mail to the owner",
    numeric: true,
    disablePadding: false,
    label: "Mail To The Owner ",
  },
  {
    id: "email to expert company",
    numeric: true,
    disablePadding: false,
    label: "Email To Expert Company",
  },
  {
    id: "elevator fitting",
    numeric: true,
    disablePadding: false,
    label: "Elevator Fitting During Drop Test",
  },
  {
    id: "last Inspection",
    numeric: true,
    disablePadding: false,
    label: "Last Inspection",
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
            align="center"
            key={headCell.id}
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
        Subject
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const TheSubject = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [baseApiData, setBaseApiData] = useState([]);

  useEffect(() => {
    let tempData = baseApiData.map((ele) => {
      if (!ele.title) ele.title = "";
      if (!ele.installationAddressName) ele.installationAddressName = "";
      if (!ele.nameOfMainAreaName) ele.nameOfMainAreaName = "";
      if (!ele.requesterName) ele.requesterName = "";
      if (!ele.ownerName) ele.ownerName = "";
      if (!ele.latestInspectionResult) ele.latestInspectionResult = "";
      //if (!ele.scheduledInspectionDate) ele.scheduledInspectionDate = null;
      if (!ele.contactNo) ele.contactNo = "";
      if (!ele.departmentName) ele.departmentName = "";
      if (!ele.mailToTheOwner) ele.mailToTheOwner = "";
      if (!ele.mailToExpertCompany) ele.mailToExpertCompany = "";
      if (!ele.elevatorFitterDuringDropTest)
        ele.elevatorFitterDuringDropTest = "";
      if (!ele.departmentName) ele.departmentName = "";
      if (!ele.mailToTheOwner) ele.mailToTheOwner = "";
      if (!ele.mailToExpertCompany) ele.mailToExpertCompany = "";
      if (!ele.elevatorFitterDuringDropTest)
        ele.elevatorFitterDuringDropTest = "";
      // if (!ele.lastInspectionDate) ele.nextVisionTest = "";

      return ele;
    });
    let lsearchText = searchValue.toLowerCase();
    let filteredData = tempData.filter(
      (x) =>
        x.title.toLowerCase().includes(lsearchText) ||
        x.installationAddressName.toLowerCase().includes(lsearchText) ||
        x.nameOfMainAreaName.toLowerCase().includes(lsearchText) ||
        x.requesterName.toLowerCase().includes(lsearchText) ||
        x.ownerName.toLowerCase().includes(lsearchText) ||
        x.latestInspectionResult.includes(lsearchText) ||
        //x.scheduledInspectionDate.toLowerCase().includes(lsearchText) ||
        x.contactNo.toLowerCase().includes(lsearchText) ||
        x.departmentName.toLowerCase().includes(lsearchText) ||
        x.mailToTheOwner.toLowerCase().includes(lsearchText) ||
        x.mailToExpertCompany.toLowerCase().includes(lsearchText) ||
        x.elevatorFitterDuringDropTest.toLowerCase().includes(lsearchText)
      // x.lastInspectionDate.toLowerCase().includes(lsearchText)
    );
    console.log(filteredData, "filtered data");
    console.log("searchValue", searchValue);
    setRows(filteredData);
  }, [searchValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModal = async (id) => {
    setOpen((prevState) => !prevState);
    let result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Subject/GetSubjectByID?SubjectID=${id}`
    );

    const option = {
      replace: true,
      state: {
        mode: Modes.edit,
        thesubjectData: result.data,
      },
    };
    navigate(routeNames.CREATETHESUBJECT, option);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const deletesubject = (subjectID) => {
    Swal.fire({
      title: "Do You Want To Delete?",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}Subject/Deletesubject?subjectID=${subjectID}`
          )
          .then((res) => {
            Swal.fire(res.data);
            getApiData();
          })
          .catch(() => {
            Swal.fire("Subject not deleted.");
          });
      }
    });
  };
  const dummyData = [
    {
      id: "1",
      value: "SPENDEN",
    },
    {
      id: "2",
      value: "UNIT PRICE",
    },
    {
      id: "3",
      value: "SALE OFFER",
    },
    {
      id: "4",
      value: "FORBRUG",
    },
  ];

  const getName = (val) => {
    return dummyData.filter((data) => data.id === val)[0]?.value;
  };

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
            navigate(routeNames.CREATETHESUBJECT, {
              state: { mode: "create" },
              replace: true,
            })
          }
        >
          Add Subject
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
                      onClick={(event) => handleClick(event, row.subjectID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.subjectID}
                      selected={isItemSelected}
                    >
                      <TableCell align="center">{row.requesterName}</TableCell>
                      <TableCell align="center">
                        {moment(row.scheduledInspectionDate).format(
                          "DD-MM-YYYY"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.installationAddressName}
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">
                        {row.nameOfMainAreaName}
                      </TableCell>
                      <TableCell align="center">{row.ownerName}</TableCell>

                      <TableCell align="center">
                        {row.latestInspectionResult}
                      </TableCell>
                      <TableCell align="center">{row.contactNo}</TableCell>
                      <TableCell align="center">{row.departmentName}</TableCell>

                      <TableCell align="center">{row.mailToTheOwner}</TableCell>
                      <TableCell align="center">
                        {row.mailToExpertCompany}
                      </TableCell>

                      <TableCell align="center">
                        {row.elevatorFitterDuringDropTest}
                      </TableCell>

                      <TableCell align="center">
                        {moment(row.lastInspectionDate).format("DD-MM-YYYY")}
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
                              onClick={() => handleModal(row.subjectID)}
                            >
                              <EditIcon />
                            </button>
                          </div>
                          <button
                            className="btn
                          btn-danger btn-sm"
                            onClick={() => deletesubject(row.subjectID)}
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
};

export default TheSubject;
