import "./newProgramWeekly.css";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Checkbox, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useStyles } from "../../utils";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { addProductTypeStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";

const key = addProductTypeStore;

export default function NewProgramWeekly() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [startDate, setStartDate] = useState("");
    const [clientProgram, setClientProgram] = useState("");
    const [ravitailleurProgram, setRavitailleurProgram] = useState("");
    const [note, setNote] = useState("");

    const programWeeklyAddOutput = useSelector((state) => state?.[key]) || initialState;

    const dispatch = useDispatch();

    const [ravitailleur, setravitailleur] = React.useState('');

    const options = [
        "Oliver Hansen",
        "Van Henry",
        "April Tucker",
        "Ralph Hubbard",
        "Omar Alexander",
        "Carlos Abbott",
        "Miriam Wagner",
        "Bradley Wilkerson",
        "Virginia Andrews",
        "Kelly Snyder",
        "Oliver Hansen",
        "Van Henry",
        "April Tucker",
        "Ralph Hubbard",
        "Omar Alexander",
        "Carlos Abbott",
        "Miriam Wagner",
        "Bradley Wilkerson",
        "Virginia Andrews",
        "Kelly Snyder"
    ];

    const classes = useStyles();


    const [selected, setSelected] = React.useState([]);
    const isAllSelected = options.length > 0 && selected.length === options.length;

    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelected(selected.length === options.length ? [] : options);
            return;
        }
        setSelected(value);
    };

    return (

        <form className="new-program-container">
            <h2 className="new-program-title">Create your weekly program</h2>
            <div className="new-program-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Select program date" />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <div className="new-program-select-client-container">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled">Client</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        multiple
                        value={selected}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(", ")}
                    >
                        <MenuItem value="all" classes={{
                            root: isAllSelected ? classes.selectedAll : ""
                        }}>
                            <ListItemIcon>
                                <Checkbox
                                    classes={{ indeterminate: classes.indeterminateColor }}
                                    checked={isAllSelected}
                                    indeterminate={
                                        selected.length > 0 && selected.length < options.length
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.selectAllText }}
                                primary="Select All"
                            />
                        </MenuItem>
                        {programWeeklyAddOutput?.clients?.data?.map((client) => (
                            <MenuItem key={client} value={client}>
                                <ListItemIcon>
                                    <Checkbox checked={selected.indexOf(client) > -1} />
                                </ListItemIcon>
                                <ListItemText primary={client} />
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </div>
            <div className="new-program-select-ravitailleur-container">
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-filled-label">Ravitailleiur</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ravitailleur}
                        label="Ravitailleur"
                        fullWidth
                        onChange={(e) => setravitailleur(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ravitailleur 1</MenuItem>
                        <MenuItem value={20}>Ravitailleur 2</MenuItem>
                        <MenuItem value={30}>Ravitailleur 3</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="new-program-note">
                <TextField
                    id="outlined-multiline-static"
                    label="Note"
                    multiline
                    rows={4}
                    defaultValue=""
                />
            </div>

            <div className="new-program-create-button">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Create
                </Button>
            </div>
        </form>
    );
}
