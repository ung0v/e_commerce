import React, { useEffect, useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./style";
import AddressForm from "../../components/CheckoutForm/AddressForm";
import PaymentForm from "../../components/CheckoutForm/PaymentForm";
import Review from "../../components/CheckoutForm/Review";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateTokenAsync } from "../../features/checkout/checkout-slice";
import { refreshCartAsync } from "../../features/cart/cart-slice";

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState();

  const cart = useSelector((state) => state.cart);
  const {
    order,
    loading: isLoading,
    errorMessage: error,
    token: checkoutToken,
    finished,
  } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const history = useHistory();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressForm next={next} />;
      case 1:
        return (
          <PaymentForm shippingData={shippingData} nextStep={handleNext} />
        );
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data) => {
    setShippingData(data);
    handleNext();
  };

  useEffect(() => {
    try {
      dispatch(generateTokenAsync(cart));
    } catch (error) {
      history.push("/");
    }
  }, [cart, dispatch, history]);

  useEffect(() => {
    if (!cart.hasOwnProperty("line_items")) {
      window.location.href = "/";
    }
  }, [cart]);

  useEffect(() => {
    if (finished) {
      dispatch(refreshCartAsync());
    }
  }, [finished]);
  console.log(order);
  let Confirmation = () =>
    order?.customer && (
      <>
        <Typography variant="h5" gutterBottom>
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          {console.log(order)}
          Your order number is #{order.customer_reference}. We have emailed your
          order confirmation, and will send you an update when your order has
          shipped.
        </Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    );

  if (isLoading) {
    Confirmation = () => (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  if (error && !isLoading) {
    Confirmation = () => (
      <div>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar}></div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
            alternativeLabel
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                <div>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                    >
                      Back
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
