import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../Features/adminUserSlice";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";


export default function Customers() {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleMenuOpen = (event, userId) => {
    setAnchorEl((prev) => ({ ...prev, [userId]: event.currentTarget }));
  };

  const handleMenuClose = (userId) => {
    setAnchorEl((prev) => ({ ...prev, [userId]: null }));
  };

  const handleChangeRole = (userId, role) => {
    dispatch(updateUserRole({ userId, role }));
    handleMenuClose(userId);
  };

  const handleRemoveUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  // if (loading) return <Typography><CircularProgress/></Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div className="p-5">
      <Card>
        <CardHeader title="All Users" />

        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table aria-label="customers table" sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} >
                  <TableCell>
                    <AvatarGroup max={1}>
                      <Avatar alt={user.firstName}>
                        {user.firstName?.[0] || user.email?.[0]}
                      </Avatar>
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor:
                          user.role === "ADMIN" ? "#4caf50" : "#2196f3",
                        color: "#fff",
                      }}
                    >
                      {user.role}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => handleMenuOpen(e, user._id)}
                    >
                      Change Status
                    </Button>
                    <Menu
                      anchorEl={anchorEl[user._id]}
                      open={Boolean(anchorEl[user._id])}
                      onClose={() => handleMenuClose(user._id)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                      <MenuItem onClick={() => handleChangeRole(user._id, "ADMIN")}>ADMIN</MenuItem>
                      <MenuItem onClick={() => handleChangeRole(user._id, "CUSTOMER")}>CUSTOMER</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveUser(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
