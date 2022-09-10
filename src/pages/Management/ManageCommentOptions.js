import { React, useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Divider,
  InputLabel,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  styled,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "alpha(theme.palette.common.white, 0.15)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: `var(--themeblack)`,
  border: "1px solid #C9D0DE",
  borderRadius: "4px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const checkIcon = {
  fontSize: "20px",
  color: `var(--themeblack)`,
  marginLeft: "10px",
};

const DropDown = ({
  toggle,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  if (!toggle) {
    return null;
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="track-select-label">Filter</InputLabel>
        <Select
          className="track-list-dropdown"
          labelId="track-select-label"
          id="track-simple-select"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={"name"} onClick={() => onSortByChange("name")}>
            Name {sortBy === "name" && <CheckIcon style={checkIcon} />}
          </MenuItem>

          <MenuItem
            value={"createdAt"}
            onClick={() => onSortByChange("createdAt")}
          >
            Date {sortBy === "createdAt" && <CheckIcon style={checkIcon} />}
          </MenuItem>
          <Divider />
          <MenuItem value={"asc"} onClick={() => onOrderByChange("asc")}>
            Ascending {orderBy === "asc" && <CheckIcon style={checkIcon} />}
          </MenuItem>

          <MenuItem value={"desc"} onClick={() => onOrderByChange("desc")}>
            Descending {orderBy === "desc" && <CheckIcon style={checkIcon} />}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const ManageCommentOptions = ({
  query,
  onQueryChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  let [toggleSort, setToggleSort] = useState(true);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: `var(--themebg)`,
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                color: `var(--themeblack)`,
                fontWeight: "bold",
              }}
            >
              My Tracks
            </Typography>

            <DropDown
              toggle={toggleSort}
              sortBy={sortBy}
              onSortByChange={(mySort) => onSortByChange(mySort)}
              orderBy={orderBy}
              onOrderByChange={(myOrder) => onOrderByChange(myOrder)}
            />

            <Search>
              <SearchIconWrapper style={{ color: "#898C97" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                name="query"
                id="query"
                value={query}
                onChange={(event) => {
                  onQueryChange(event.target.value);
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ManageCommentOptions;
