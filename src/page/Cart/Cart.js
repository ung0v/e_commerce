import { Container, Typography, Button, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/Cart/CartItem/CartItem";
import { emptyCartAsync } from "../../features/cart/cart-slice";
import useStyles from "./style";
const Cart = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const emptyCart = () => {
    dispatch(emptyCartAsync());
  };

  const EmptyCart = () => (
    <Typography variants="subtitle1">
      You have no items in your shopping cart, <Link to="/">Go back</Link>{" "}
      please add something !
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variants="h4">
          Subtotal: {cart.subtotal.formatted_with_code}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  // if (!cart.line_items)
  //   return (
  //     <Container>
  //       <div className={classes.toolbar}></div>
  //       Loading...
  //     </Container>
  //   );
  return (
    <>
      <Container>
        <div className={classes.toolbar}></div>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart.line_items?.length ? <EmptyCart /> : <FilledCart />}
      </Container>
    </>
  );
};

export default Cart;
