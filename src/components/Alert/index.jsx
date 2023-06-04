import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CloseOutlined } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertPopup({ type, message }) {
	const [open, setOpen] = React.useState(true);

	// const handleClose = (event, reason) => {
	// 	if (reason === "clickaway") {
	// 		return;
	// 	}

	// 	// setOpen(false);
	// };

	if (open) {
		setTimeout(() => {
			setOpen(false);
		}, 2000);
	}

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			{/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}> */}
			{/* <Collapse in={open}>
					<Alert
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
								}}>
								<CloseOutlined fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2 }}>
						{message || "operation passed successfully"}
					</Alert>
				</Collapse> */}
			{/* </Snackbar> */}
			<Collapse in={open}>
				<Alert
					severity={type}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}>
							<CloseOutlined fontSize="inherit" />
						</IconButton>
					}>
					{message || "operation passed successfully"}
				</Alert>
			</Collapse>
		</Stack>
	);
}
