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
  ringCategoryId,
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

  const [ringCategory, setRingCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.ringCategory);

  useEffect(() => {
    dispatch(getRingCategories());
  }, []);

  useEffect(() => {
    console.log(categories);
    setRingCategory(
      categories?.filter((cate) => cate.ringCategoryId !== ringCategoryId)[0]
    );
  }, [ringCategoryId, categories]);

  useEffect(() => {
    open ? setInput() : resetInput();
  }, [ringCategory, open]);

  const submitForm = (data) => {
    console.log(data);
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
