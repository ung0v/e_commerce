import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useStyle from "./style";
import { fetchCartAsync } from "../../features/cart/cart-slice";
const Navbar = () => {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const { total_items } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  // console.log(cart);
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
