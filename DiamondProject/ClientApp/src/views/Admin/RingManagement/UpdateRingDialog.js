import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getRingCategories } from "../../../actions/ring";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = yup.object({
  ringName: yup.string().required("Tên nhẫn không được để trống"),
  quantity: yup
    .number()
    .typeError("Số lượng phải là số nguyên")
    .integer("Số lượng phải là số nguyên")
    .min(1, "Tối thiểu 1 chiếc")
    .required("Số lượng không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số nguyên")
    .integer()
    .min(1000000, "Tối thiểu 1 triệu")
    .required("Giá không được để trống"),
});

export default function UpdateRingDialog({
  open,
  handleCloseUpdateDialog,
  ringId,
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

  const [selectedImages, setSelectedImages] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [category, setCategory] = useState(null);
  const [ring, setRing] = useState(null);
  const [ringName, setRingName] = useState(null);

  const categories = useSelector((state) => state.ringCategory);
  const rings = useSelector((state) => state.ring);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRingCategories());
    setRing(rings?.filter((ring) => ring.ringId === ringId)[0]);
    //console.log(ring);
    open ? setInput() : resetInput();
  }, [open, rings, ringId]);

  useEffect(() => {
    setRingName(ring?.ringName);
  }, [ring]);

  const resetInput = () => {
    resetField("price", "");
    resetField("ringName", "");
    resetField("ringDescription", "");
    resetField("quantity", "");
    resetField("size", "");
    resetField("resizable", "");
    resetField("material", "");
    resetField("madeIn", "");
  };
  const setInput = () => {
    setValue("price", ring?.price);
    setValue("ringName", ring?.ringName);
    setValue("ringDescription", ring?.ringDescription);
    setValue("quantity", ring?.quantity);
    setValue("size", ring?.size);
    setValue("resizable", ring?.resizable);
    setValue("material", ring?.material);
    setValue("madeIn", ring?.madeIn);
  };

  const submitForm = async (data, e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("ringName", data.ringName);
    fd.append("ringDescription", data.ringDescription);
    fd.append("quantity", data.quantity);
    fd.append("size", data.size);
    fd.append("resizable", data.resizable);
    fd.append("price", data.price);
    fd.append("material", data.material);
    fd.append("madeIn", data.madeIn);
    fd.append("categoryId", category);
    imgs.forEach((img) => {
      fd.append("images", img);
    });
    console.log(data);
    try {
      const response = await axiosPrivate.put(`/ring/${ringId}`, fd);
      dispatch(updateRingAction(response.data));
      //handleCloseAddDialog();
    } catch (error) {
      console.log(error);
      alert("Sửa không thành công!");
    }
    // const res = await dispatch(addRing(fd));
    // if (res) {
    //   handleCloseAddDialog();
    // } else {

    // }
  };
  const updateRingAction = (data) => async (dispatch) => {
    dispatch({ type: "UPDATE_RING", payload: data });
  };

  useEffect(() => {
    setCategory(ring?.ringCategoryId);
  }, [categories]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setImgs(selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
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
              Sửa nhẫn
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
                      label="Tên nhẫn"
                      variant="filled"
                      fullWidth
                      {...register("ringName")}
                    />
                    {/* <input
                      type="text"
                      name="ringName"
                      id="ringName"
                      value={ringName}
                      {...register("ringName")}
                      onChange={(e) => setRingName(e.target.value)}
                    /> */}
                    {errors.ringName && (
                      <span className="error-message" role="alert">
                        {errors.ringName?.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group mg-bottom-1">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Mô tả về nhẫn"
                      multiline
                      rows={4}
                      variant="filled"
                      fullWidth
                      {...register("ringDescription")}
                    />
                  </div>
                  <div className="row mg-bottom-1">
                    <div className="form-group col-md-3">
                      <TextField
                        required
                        id="filled-basic"
                        label="Số lượng"
                        variant="filled"
                        {...register("quantity")}
                      />
                      {errors.quantity && (
                        <span className="error-message" role="alert">
                          {errors.quantity?.message}
                        </span>
                      )}
                    </div>
                    <div
                      className="form-group col-md-3"
                      style={{ height: "60px" }}
                    >
                      <TextField
                        id="filled-basic"
                        label="Cỡ"
                        variant="filled"
                        {...register("size")}
                      />
                      {errors.size && (
                        <span className="error-message" role="alert">
                          {errors.size?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        required
                        id="filled-basic"
                        label="Resizable"
                        variant="filled"
                        {...register("resizable")}
                      />
                      {errors.resizable && (
                        <span className="error-message" role="alert">
                          {errors.resizable?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-3">
                      <TextField
                        id="filled-basic"
                        label="Giá"
                        variant="filled"
                        required
                        {...register("price")}
                      />
                      {errors.price && (
                        <span className="error-message" role="alert">
                          {errors.price?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mg-bottom-1">
                    <div className="form-group col-md-3">
                      <TextField
                        required
                        id="filled-basic"
                        label="Chất liệu"
                        variant="filled"
                        {...register("material")}
                      />
                      {errors.material && (
                        <span className="error-message" role="alert">
                          {errors.material?.message}
                        </span>
                      )}
                    </div>
                    <div
                      className="form-group col-md-3"
                      style={{ height: "60px" }}
                    >
                      <TextField
                        id="filled-basic"
                        label="Xuất xứ"
                        variant="filled"
                        {...register("madeIn")}
                      />
                      {errors.madeIn && (
                        <span className="error-message" role="alert">
                          {errors.madeIn?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-3">
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">
                          Loại nhẫn
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          value={category}
                          onChange={handleChangeCategory}
                          input={<OutlinedInput label="Loại nhẫn" />}
                        >
                          {categories
                            ? categories.map((cate) => {
                                return (
                                  <MenuItem
                                    key={cate.ringCategoryId}
                                    value={cate.ringCategoryId}
                                  >
                                    {cate.name}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <Button variant="contained" color="success" type="submit">
                    Lưu
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="card card-item">
              <div className="card-body">
                <div className="form-group">
                  <label className="fs-14 text-black fw-medium lh-20">
                    Chọn ảnh
                  </label>
                  <div className="file-upload-wrap file-upload-layout-2">
                    <input
                      className="multi file-upload-input"
                      multiple
                      type="file"
                      name="images"
                      onChange={onSelectFile}
                      accept="image/png, image/jpeg, image/webp"
                    />
                    <span className="file-upload-text d-flex align-items-center justify-content-center">
                      <i className="la la-cloud-upload mr-2 fs-24"></i>Thả file
                      hoặc click để đăng ảnh.
                    </span>
                  </div>
                </div>
                <div className="images">
                  {selectedImages &&
                    selectedImages.map((image, index) => {
                      return (
                        <div key={index} className="image">
                          <div
                            style={{ margin: "0 auto", width: "fit-content" }}
                          >
                            <img src={image} height="200" alt="upload" />
                          </div>
                          <button
                            onClick={() =>
                              setSelectedImages(
                                selectedImages.filter((e) => e !== image)
                              )
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
