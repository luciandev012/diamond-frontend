import { yupResolver } from "@hookform/resolvers/yup";
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
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getRingCategories } from "../../../actions/ring";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const schema = yup.object({
  name: yup.string().required("Tên không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateRingCategoryDialog({
  open,
  handleCloseUpdateDialog,
  ringCategory,
  dispatch,
}) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    open ? setInput() : resetInput();
  }, [open]);

  const submitForm = async (data) => {
    try {
      const response = await axiosPrivate.put(
        `/ring/ring-category/${ringCategory.id}`,
        data
      );
      console.log(response);
      dispatch(updateRingCategoryAction(response.data));
      handleCloseUpdateDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const updateRingCategoryAction = (data) => async (dispatch) => {
    dispatch({ type: "UPDATE_RING_CATEGORY", payload: data });
  };

  const setInput = () => {
    setValue("name", ringCategory?.name);
    setValue("description", ringCategory?.description);
  };
  const resetInput = () => {
    resetField("name", "");
    resetField("description", "");
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseUpdateDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseUpdateDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thêm loại nhẫn
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
                      label="Tên loại nhẫn"
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
                      label="Mô tả về loại nhẫn"
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
