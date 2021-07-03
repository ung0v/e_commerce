import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  removeCartAsync,
  replaceCartAsync,
} from "../../../features/cart/cart-slice";
import useStyles from "./style";
const CartItem = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const increaseCart = (id, quantity) => {
    dispatch(replaceCartAsync({ LineItemId: id, quantity: quantity + 1 }));
  };

  const decreaseCart = (id, quantity) => {
    dispatch(replaceCartAsync({ LineItemId: id, quantity: quantity - 1 }));
  };

  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h5" align="right">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => decreaseCart(item.id, item.quantity)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => increaseCart(item.id, item.quantity)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => dispatch(removeCartAsync({ productId: item.id }))}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
