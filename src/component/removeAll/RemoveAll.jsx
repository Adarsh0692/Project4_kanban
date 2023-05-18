import React from "react";
import { clearAll } from "../../store/ListSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const RemoveAll = () => {
  const dispatch = useDispatch();

  const deleteAll = () => {
    dispatch(clearAll());
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Clear All
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do You want to delete all the list ?"}
          </DialogTitle>
          <DialogActions>
            <Button
              sx={{ background: "red" }}
              variant="contained"
              autoFocus
              onClick={handleClose}
            >
              N0
            </Button>
            <Button
              sx={{ background: "green" }}
              variant="contained"
              onClick={deleteAll}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default RemoveAll;
