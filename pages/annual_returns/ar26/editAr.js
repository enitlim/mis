import { useRouter } from 'next/router'
import React,{useState, useEffect} from 'react'
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  InputLabel,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  getAr26IndividualRecord,
  patchAr26IndividualRecord,
} from "../../services/ar26/ar26details";


const EditAr = () => {
     const route = useRouter();
     const { query } = route;
  const [ar26Data, setAr26Data] = useState({});
  useEffect(() => {
    if (query.id != null) {
      const fetchDataFromBackend = async () => {
        const result = await getAr26IndividualRecord(query.id);
        setAr26Data(result);
      };
      fetchDataFromBackend();
    }
    
  }, []);
  console.log(ar26Data);
    const {register, handleSubmit, control, watch, formState:{errors}}=useForm();
    const onSubmit=async (data)=>{
      data["brCode"] = ar26Data.data.brCode;
      console.log("This is the data: ", data, "for ID", query.id);
      console.log("Type of the data: ", typeof(data));
      try {
         const result = await patchAr26IndividualRecord(query.id, data);
         console.log("Result of Patch: ", result);
      } catch (error) {
              console.error(error.message);

      }
    };
    // console.log(watch("email", "password"));
 
console.log();
  return Object.keys(ar26Data).length > 0 ? (
    <>
      editAr for {query.id}
      <Container maxWidth="l">
        <Typography variant="h5" align="center" gutterBottom>
          Edit
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Credit BGL Number"
              variant="outlined"
              type="number"
              margin="normal"
              defaultValue={ar26Data.data.bglNumber}
              {...register("bglNumber", {
                required: "BGL Number is required",
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                //   message: "Invalid email address",
                // },
              })}
              error={!!errors.bglNumber}
              helperText={errors.bglNumber?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="TDS deducted"
              type="number"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.tdsDeducted}
              {...register("tdsDeducted", { required: "TDS is required" })}
              error={!!errors.tdsDeducted}
              helperText={errors.tdsDeducted?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name of Vendor"
              type="text"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.nameOfVendor}
              {...register("nameOfVendor", {
                required: "Name of Vendor is required",
              })}
              error={!!errors.nameOfVendor}
              helperText={errors.nameOfVendor?.message}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel>Nature Of Payment</InputLabel>

            <Controller
              name="profession"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="profession" fullWidth>
                  <MenuItem value="Rent">Rent</MenuItem>
                  <MenuItem value="Appraisal Charges">
                    Appraisal Charges
                  </MenuItem>
                  <MenuItem value="Profession Fee">Profession Fee</MenuItem>
                  <MenuItem value="Law Charges">Law Charges</MenuItem>
                  <MenuItem value="AMC">AMC</MenuItem>
                </Select>
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Govt Body Type"
              type="text"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.isGovtBody}
              {...register("isGovtBody")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Amount/Rent Paid"
              type="number"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.amountRentPaid}
              {...register("amountRentPaid")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="PAN"
              type="text"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.pan}
              {...register("pan", { required: "PAN is required" })}
              error={!!errors.pan}
              helperText={errors.password?.pan}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Address"
              type="text"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.address}
              {...register("address")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="GST-IN"
              type="text"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.gstIn}
              {...register("gstIn")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Monthly Rent"
              type="number"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.monthlyRent}
              {...register("monthlyRent")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="TDS Rate"
              type="number"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.tdsRate}
              {...register("tdsRate", { required: "TDS Rate is required" })}
              error={!!errors.tdsRate}
              helperText={errors.tdsRate?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Debit BGL Number"
              type="number"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.bglDr}
              {...register("bglDr")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              // label="Payment Date"
              type="date"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.paymentDate}
              {...register("paymentDate", {
                required: "Payment Date is required",
              })}
              error={!!errors.paymentDate}
              helperText={errors.paymentDate?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Remarks"
              type="text"
              variant="outlined"
              margin="normal"
              defaultValue={ar26Data.data.remarks}
              {...register("remarks")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  ) : (
    <></>
  );
}

export default EditAr