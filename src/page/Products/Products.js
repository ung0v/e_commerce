import Product from "../../components/Product/Product";
import useStyles from "./style";

import { Grid, Container } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsAysnc } from "../../features/products/product-slice";

const Products = ({ onAddToCart }) => {
  const { products, loading: isLoading } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAysnc());
  }, [dispatch]);
  console.log(products);
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Container container justify="center" spacing="4">
        <Grid container justify="center" spacing="4">
          {(isLoading ? Array.from(new Array(8)) : products).map((product) => {
            return product ? (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rect" width={285} height={355} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </main>
  );
};

export default Products;
