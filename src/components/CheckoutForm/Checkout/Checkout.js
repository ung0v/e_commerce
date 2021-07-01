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
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Review from "../Review";
import { commerce } from "../../../lib/commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState();

  const history = useHistory();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressForm checkoutToken={checkoutToken} next={next} />;
      case 1:
        return (
          <PaymentForm
            checkoutToken={checkoutToken}
            shippingData={shippingData}
            onCaptureCheckout={onCaptureCheckout}
            nextStep={handleNext}
          />
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

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateTokenFrom("cart", cart.id);
      setCheckoutToken(token);
    } catch (error) {
      history.push("/");
    }
  };
  useEffect(() => {
    generateToken();
  }, [cart]);

  let Confirmation = () =>
    order ? (
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
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
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
