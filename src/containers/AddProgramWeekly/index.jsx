import "./newProgramWeekly.css";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Alert, Button, Checkbox, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useStyles } from "../../utils";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AlertPopup from "../../components/Alert";
import { addProgramWeeklyStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import { addProgramWeekly, getAvailableClients, getAvailableRavitailleurs } from "./action";

const key = addProgramWeeklyStore;

export default function NewProgramWeekly() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [startDate, setStartDate] = useState(null);
    const [clientsProgram, setClientsProgram] = useState([]);
    const [ravitailleurProgram, setRavitailleurProgram] = useState("");
    const [note, setNote] = useState("");

    const [dateError, setDateError] = useState(true);
    const [ravitailleurError, setRavitailleurError] = useState(true);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const programWeeklyAddOutput = useSelector((state) => state?.[key]) || initialState;

    const dispatch = useDispatch();

    const classes = useStyles();

    const clientsLengthList = programWeeklyAddOutput?.clients?.data?.length;

    const handleDateChange = (date) => {
        if(!date) {
            setDateError(true);
        } else {
            setDateError(false);
        }
        setStartDate(date);
    };

    const handleClientsChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setClientsProgram(clientsProgram.length === clientsLengthList ? [] : programWeeklyAddOutput?.clients?.data);
            return;
        }
        setClientsProgram(value);
    };

    const onCreateButtonClick = (event) => {
        event.preventDefault();
        if(!dateError && !ravitailleurError) {
            dispatch(
                addProgramWeekly({
                    date: startDate,
                    description: note,
                    username: ravitailleurProgram,
                    clients: clientsProgram.map((id) => {
                        return { idClient: id };
                    }),
                })
            );
        }
        
        setShowSuccessAlert(true);
    };

    useEffect(() => {
        dispatch(getAvailableClients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getAvailableRavitailleurs());
    }, []);

    useEffect(() => {
        let timeoutId;
        if (showSuccessAlert) {
          timeoutId = setTimeout(() => {
            setShowSuccessAlert(false);
          }, 8000); // less than 10 seconds
        }
        return () => clearTimeout(timeoutId);
      }, [showSuccessAlert]);

    return (

        <form className="new-program-container">
            {(programWeeklyAddOutput?.ravitailleurs?.loading || programWeeklyAddOutput?.clients?.loading ||
                programWeeklyAddOutput?.programWeekly?.loading) && <Loader />}

            {(programWeeklyAddOutput?.ravitailleurs?.error || programWeeklyAddOutput?.clients?.error || programWeeklyAddOutput?.programWeekly?.error) && (
                <AlertPopup type="error" message="a problem occured" />
            )}

            {showSuccessAlert && programWeeklyAddOutput?.success && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">program weekly successfully !</Alert>
                </Stack>
            )}

            <h2 className="new-program-title">Create your weekly program</h2>
            <div className="new-program-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Select program date"
                            value={startDate}
                            onChange={handleDateChange}
                            error={dateError} />
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
                        value={clientsProgram}
                        onChange={handleClientsChange}
                        renderValue={(clientsProgram) => clientsProgram.join(", ")}
                    >

                        {programWeeklyAddOutput?.clients?.data?.map((client, index) => (
                            <MenuItem key={index} value={client?.idClient}>
                                <ListItemIcon>
                                    <Checkbox checked={clientsProgram.indexOf(client.idClient) > -1} />
                                </ListItemIcon>
                                <ListItemText primary={client?.nom} />
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
                        value={ravitailleurProgram}
                        label="Ravitailleur"
                        fullWidth
                        onChange={(e) => {
                            setRavitailleurProgram(e.target.value);
                            setRavitailleurError(e.target.value === "");
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            programWeeklyAddOutput?.ravitailleurs?.data?.map((ravi) => (
                                <MenuItem
                                    value={ravi?.username}>
                                    {ravi?.username}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <div className="new-program-note">
                <TextField
                    id="outlined-multiline-static"
                    label="Note"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    multiline
                    rows={4}
                />
            </div>

            <div className="new-program-create-button">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={onCreateButtonClick}
                    disabled={dateError || ravitailleurError}
                >
                    Create
                </Button>
            </div>
        </form>
    );
}
