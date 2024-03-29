import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteRing, getRings } from "../../../actions/ring";
import Loading from "../../../components/Loading/Loading";
import { Avatar, Button } from "@mui/material";
import { getImgUrl } from "../../../helper/helper";
import "./ring.css";
import AddRingDialog from "./AddRingDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UpdateRingDialog from "./UpdateRingDialog";

export default function RingManagement() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    dispatch(getRings());
  }, []);

  const rings = useSelector((state) => state.ring);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "ringName", headerName: "Tên nhẫn", width: 200 },
    {
      field: "image",
      headerName: "Ảnh",
      width: 100,
      height: 200,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { field: "ringDescription", headerName: "Mô tả", width: 250 },
    {
      field: "quantity",
      headerName: "Số lượng",
      type: "number",
      width: 90,
    },
    {
      field: "size",
      headerName: "Cỡ",
      type: "number",
      width: 90,
    },
    {
      field: "price",
      headerName: "Giá",
      type: "number",
      width: 100,
    },
    { field: "material", headerName: "Chất liệu", width: 150 },
  ];

  const rows = rings
    ? rings.map((ring) => {
        const {
          ringId,
          ringName,
          images,
          ringDescription,
          quantity,
          size,
          price,
          material,
        } = ring;
        return {
          id: ringId,
          ringName,
          image: getImgUrl(images[0].path),
          ringDescription,
          quantity,
          size,
          price,
          material,
        };
      })
    : [];

  const [selectedRing, setSelectedRing] = useState(null);
  const handleSelected = (params) => {
    setSelectedRing(params.row.id);
  };
  const handleDeleteRing = async () => {
    try {
      const { status } = await axiosPrivate.delete(`/ring/${selectedRing}`);
      if (status === 200) {
        dispatch((dis) => dis({ type: "DELETE_RING", payload: selectedRing }));
      }
    } catch (error) {
      alert("Xóa không thành công!");
    }
  };
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const handleClickUpdateRing = () => {
    selectedRing ? setOpenUpdate(true) : alert("Chưa chọn nhẫn để sửa");
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  };

  return rings ? (
    <>
      <h2 style={{ marginBottom: "2rem" }}>Quản lý nhẫn</h2>
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
          onClick={() => handleClickUpdateRing()}
        >
          Sửa
        </Button>
        <Button
          className="mg-right-1"
          variant="outlined"
          color="error"
          onClick={() => handleDeleteRing()}
        >
          Xóa
        </Button>
      </div>
      <AddRingDialog
        open={openAdd}
        handleCloseAddDialog={handleCloseAddDialog}
      />
      {selectedRing && (
        <UpdateRingDialog
          open={openUpdate}
          handleCloseUpdateDialog={handleCloseUpdateDialog}
          ringId={selectedRing}
        />
      )}
    </>
  ) : (
    <Loading />
  );
}
