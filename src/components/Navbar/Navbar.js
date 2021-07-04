import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  InputBase,
  TextField,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Autocomplete } from "@material-ui/lab";

import useStyle from "./style";
import { fetchCartAsync } from "../../features/cart/cart-slice";
const Navbar = () => {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const { total_items } = useSelector((state) => state.cart);
  const { products, loading: isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            {/* <img src={} alt="commerce.js" height="25px" className={classes.image} /> */}
            eCommerce
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
              freeSolo
              openOnFocus={true}
              disableClearable
              options={products.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="white"
                  placeholder="Search..."
                  className={classes.inputInput}
                  InputProps={{
                    ...params.InputProps,
                    disableClearable: true,
                    type: "search",
                    disableUnderline: true,
                    classes: {
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    },
                  }}
                />
              )}
            />
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            /> */}
          </div>
          <div className={classes.grow}></div>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                arial-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={total_items} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
