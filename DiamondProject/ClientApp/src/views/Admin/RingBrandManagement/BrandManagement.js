import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../../../actions/ring-brand";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loading from "../../../components/Loading/Loading";
import AddBrandDialog from "./AddBrandDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ALERT_DELETE_MESSAGE } from "../../../common-message";
import UpdateBrandDialog from "./UpdateBrandDialog";

export default function BrandManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brands = useSelector((state) => state.brand);
  const axiosPrivate = useAxiosPrivate();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  //config table
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Tên hãng", width: 200 },
    { field: "description", headerName: "Mô tả", width: 350 },
  ];

  const rows = brands
    ? brands.map((brand) => {
        const { brandId, name, description } = brand;
        return {
          id: brandId,
          name,
          description,
        };
      })
    : [];

  const handleSelected = (params) => {
    setSelectedBrand(params.row);
  };

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const handleDeleteBrand = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/ringbrand/brand/${selectedBrand.id}`
      );
      dispatch(deleteBrandAction(selectedBrand.id));
    } catch (error) {
      alert(ALERT_DELETE_MESSAGE + error.message);
    }
  };

  const deleteBrandAction = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_BRAND", payload: id });
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  };
  const handleOpenUpdateDialog = () => {
    setOpenUpdate(true);
  };

  return brands ? (
    <>
      <h2 style={{ marginBottom: "2rem" }}>Quản lý hãng</h2>
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
        <Button
          className="mg-right-1"
          variant="outlined"
          color="secondary"
          onClick={() => handleOpenUpdateDialog()}
        >
          Sửa
        </Button>
        <Button
          className="mg-right-1"
          variant="outlined"
          color="error"
          onClick={() => handleDeleteBrand()}
        >
          Xóa
        </Button>
      </div>
      <AddBrandDialog
        open={openAdd}
        handleCloseAddDialog={handleCloseAddDialog}
        dispatch={dispatch}
        axiosPrivate={axiosPrivate}
      />
      {selectedBrand && (
        <UpdateBrandDialog
          openUpdate={openUpdate}
          handleCloseUpdateDialog={handleCloseUpdateDialog}
          dispatch={dispatch}
          axiosPrivate={axiosPrivate}
          brand={selectedBrand}
        />
      )}
    </>
  ) : (
    <Loading />
  );
}
