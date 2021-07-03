import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../features/cart/cart-slice";
import useStyles from "./style";
const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6" gutterBottom className={classes.cardTitle}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" style={{ alignSelf: "flex-end" }}>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        {/* <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        /> */}
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to cart"
          onClick={() =>
            dispatch(addToCartAsync({ productId: product.id, quantity: 1 }))
          }
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
