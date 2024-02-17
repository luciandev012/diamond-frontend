import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getRingCategories } from "../../../actions/ring";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../../components/Loading/Loading";
import { Button } from "@mui/material";
import AddRingCategoryDialog from "./AddRingCategoryDialog";

export default function RingCategoryManagement() {
  const dispatch = useDispatch();
  const ringCategories = useSelector((state) => state.ringCategory);
  useEffect(() => {
    dispatch(getRingCategories());
  }, []);

  //config table
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Tên loại nhẫn", width: 200 },
    { field: "description", headerName: "Mô tả", width: 350 },
  ];

  const rows = ringCategories
    ? ringCategories.map((cate) => {
        const { ringCategoryId, name, description } = cate;
        return {
          id: ringCategoryId,
          name,
          description,
        };
      })
    : [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSelected = (params) => {
    setSelectedCategory(params.row);
  };
  const handleDeleteCategory = async () => {
    let res = await dispatch(deleteCategory(selectedCategory.id));
    if (!res) {
      alert("Xóa không thành công!");
    }
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  return ringCategories ? (
    <>
      <h2 style={{ marginBottom: "2rem" }}>Quản lý loại nhẫn</h2>
      <div style={{ height: 500, margin: "0 auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={(params) => handleSelected(params)}
        />
      </div>
      <div className="button-action">
        <Button
          className="mg-right-1"
          variant="outlined"
          color="success"
          onClick={() => handleOpenAddDialog()}
        >
          Thêm
        </Button>
        <Button className="mg-right-1" variant="outlined" color="secondary">
          Sửa
        </Button>
        <Button
          className="mg-right-1"
          variant="outlined"
          color="error"
          onClick={() => handleDeleteCategory()}
        >
          Xóa
        </Button>
      </div>
      <AddRingCategoryDialog
        open={openAdd}
        handleCloseAddDialog={handleCloseAddDialog}
        dispatch={dispatch}
      />
    </>
  ) : (
    <Loading />
  );
}
