import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "./action";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { getUsersStore } from "../../app/applicationStates";
import { useEffect } from "react";
import { updateUsers } from "./action";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";

const key = getUsersStore;

export default function UserList() {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const usersListData = useSelector((state) => state?.[key]) || initialState;
  console.log(usersListData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handleDelete = (username) => {
    dispatch(deleteUser(username));

    dispatch(
      updateUsers(
        usersListData?.data.filter((user) => user.username != username)
      )
    );
  };

  const columns = [
    { field: "idFournisseur", headerName: "ID", width: 90 },
    {
      field: "nom",
      headerName: "User",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 120,
    },
    {
      field: "username",
      headerName: "Username",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.username}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.username)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, [])

  return (
    <div className="userList">

      {(usersListData?.loading ||
        usersListData?.deleteUser?.loading) && <Loader />}
      {(usersListData?.error || usersListData?.deleteUser?.error) && (
        <AlertPopup type="error" message="a problem occured" />
      )}
      {usersListData?.deleteUser?.success && (
        <AlertPopup type="success" message="user deleted" />
      )}

      <div className="userTitleContainer">
        <h1>Admins List</h1>
        <Link to="/newUser">
          <button className="userAddButton">Add</button>
        </Link>
      </div>

      <DataGrid
        rows={usersListData?.data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row?.idFournisseur}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
