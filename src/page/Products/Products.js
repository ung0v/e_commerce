import Product from "../../components/Product/Product";
import useStyles from "./style";

import { Grid, Container } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductsAysnc } from "../../features/products/product-slice";
import usePagination from "../../hooks/usePagination";

const Products = ({ onAddToCart }) => {
  const classes = useStyles();
  const { products, loading: isLoading } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const itemPerPage = 8;

  const [page, setPage] = useState(1);

  const reverseProducts = [...products].reverse();
  // const reverseProducts = [].concat(products).reverse();

  const data = [
    ...products,
    ...reverseProducts,
    ...products,
    ...reverseProducts,
  ];

  const {
    currentData,
    maxPage: count,
    jump,
    next,
    prev,
  } = usePagination(data, itemPerPage);

  const handleChange = (e, p) => {
    setPage(p);
    jump(p);
  };

  useEffect(() => {
    dispatch(fetchProductsAysnc());
  }, [dispatch]);
  console.log(products);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Container container justify="center" spacing="4">
        <Grid container justify="center" spacing="4">
          {(isLoading ? Array.from(new Array(itemPerPage)) : currentData()).map(
            (product) => {
              return product ? (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton variant="rect" width={285} height={355} />
                </Grid>
              );
            }
          )}
          {products && (
            <Pagination
              count={count}
              page={page}
              // siblingCount={1}
              color="primary"
              // variant="outlined"
              style={{ justifyContent: "center" }}
              onChange={handleChange}
            />
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default Products;
