import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ALERT_ADD_MESSAGE } from "../../../common-message";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const schema = yup.object({
  name: yup.string().required("Tên hãng không được để trống!"),
  description: yup.string(),
});

export default function AddBrandDialog({
  open,
  handleCloseAddDialog,
  dispatch,
  axiosPrivate,
}) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data, e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("ringbrand/brand", data);
      dispatch(addBrandAction(response.data));
      handleCloseAddDialog();
      resetInput();
    } catch (error) {
      alert(ALERT_ADD_MESSAGE);
    }
  };

  const resetInput = () => {
    resetField("name", "");
    resetField("description", "");
  };

  const addBrandAction = (data) => async (dispatch) => {
    dispatch({ type: "ADD_BRAND", payload: data });
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseAddDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseAddDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thêm hãng
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="row">
          <div className="col-lg-8" style={{ position: "relative" }}>
            <form
              noValidate
              onSubmit={handleSubmit(submitForm)}
              style={{ position: "sticky", top: "100px" }}
            >
              <div className="card card-item">
                <div className="card-body">
                  <div className="form-group mg-bottom-1">
                    <TextField
                      required
                      id="filled-basic"
                      label="Tên hãng"
                      variant="filled"
                      fullWidth
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="error-message" role="alert">
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group mg-bottom-1">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Mô tả về hãng"
                      multiline
                      rows={4}
                      variant="filled"
                      fullWidth
                      {...register("description")}
                    />
                  </div>
                  <Button variant="contained" color="success" type="submit">
                    Lưu
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
