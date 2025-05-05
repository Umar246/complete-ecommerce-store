import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Features/orderSlice";

export default function DeliveryAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("user in delivery address form: ", user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };
    console.log("address", address);

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <div className="mt-[3rem] lg:mt-[5rem] ">
      <Grid container spacing={{ xs: 0, md: 4 }} gap={{ xs: 3, md: 0 }}>
        {/* //TODO: Address Card  */}
        <Grid
          xs={12}
          md={5}
          className="border bg-white rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            {user?.address?.map((item) => {
              return (
                <>
                  <div className="space-y-8">
                    <AddressCard address={item} />
                    <hr  className="pb-4"/>
                  </div>
                </>
              );
            })}

            <Button
              onClick={() => navigate("/checkout/?step=3")}
              sx={{ mt: 2 }}
              size="medium"
              variant="contained"
              className="styledButton"
            >
              Deliver Here
            </Button>
          </div>
        </Grid>

        {/* //TODO: Form Side */}
        <Grid item xs={12} md={7}>
          <Box className="border rounded-s-md shadow-md bg-white p-7">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="firstName"
                    name="firstName"
                    size="small"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="lastName"
                    name="lastName"
                    size="small"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="address"
                    name="address"
                    size="small"
                    label="Address"
                    multiline
                    rows={4}
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="city"
                    name="city"
                    size="small"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="state"
                    name="state"
                    size="small"
                    label="State / Province / Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="zip"
                    name="zip"
                    size="small"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    className="bg-[#f2f2f2]"
                    id="phoneNumber"
                    name="phoneNumber"
                    size="small"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    sx={{ mt: 1 }}
                    size="medium"
                    variant="contained"
                    className="styledButton"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
