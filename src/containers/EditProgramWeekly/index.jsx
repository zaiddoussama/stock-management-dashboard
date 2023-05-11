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
import { updateProgramWeeklyStore } from "../../app/applicationStates";
import { useInjectReducer } from "../../app/injectReducer";
import { useInjectSaga } from "../../app/injectSaga";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableClients, getAvailableRavitailleurs, getProgramWeekly, updateProgramWeekly } from "./action";

const key = updateProgramWeeklyStore;

export default function EditProgramWeekly() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const programWeeklyUpdateOutput = useSelector((state) => state?.[updateProgramWeeklyStore]) || initialState;

    useEffect(() => {
        dispatch(getProgramWeekly(parseInt(window.location.href.split("/").at(-1))));
    }, []);

    const [startDate, setStartDate] = useState(null);
    const [clientsProgram, setClientsProgram] = useState([]);
    const [ravitailleurProgram, setRavitailleurProgram] = useState("");
    const [note, setNote] = useState("");

    const dispatch = useDispatch();

    const classes = useStyles();

    const clientsLengthList = programWeeklyUpdateOutput?.clients?.data?.length;

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleClientsChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setClientsProgram(clientsProgram.length === clientsLengthList ? [] : programWeeklyUpdateOutput?.clients?.data);
            return;
        }
        setClientsProgram(value);
    };

    const onCreateButtonClick = (event) => {
        event.preventDefault();
            dispatch(
                updateProgramWeekly({
                    dateDebutProgramme: startDate,
                    description: note,
                })
            );
    };

    useEffect(() => {
        dispatch(getProgramWeekly(parseInt(window.location.href.split("/").at(-1))));
    }, []);

    useEffect(() => {
        dispatch(getAvailableClients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getAvailableRavitailleurs());
    }, []);

    useEffect(() => {
        // setStartDate(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.[0]?.dateDebutProgramme || new Date());
        setNote(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.[0]?.description || []);
        setRavitailleurProgram(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.[0]?.ravitailleur.nom);
    }, [programWeeklyUpdateOutput?.currentProgramWeekly]);

    console.log(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.[0]?.ravitailleur.nom);

    return (

        <form className="new-program-container">
            {(programWeeklyUpdateOutput?.ravitailleurs?.loading || programWeeklyUpdateOutput?.clients?.loading ||
                programWeeklyUpdateOutput?.currentProgramWeekly?.loading) && <Loader />}

            {(programWeeklyUpdateOutput?.ravitailleurs?.error || programWeeklyUpdateOutput?.clients?.error ||
                programWeeklyUpdateOutput?.currentProgramWeekly?.error) && (
                    <AlertPopup type="error" message="a problem occured" />
                )}

            {programWeeklyUpdateOutput?.success && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">program weekly updated successfully !</Alert>
                </Stack>
            )}

            <h2 className="new-program-title">Edit your weekly program</h2>
            <div className="new-program-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Select program date"
                            value={startDate}
                            onChange={handleDateChange} />
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

                        {programWeeklyUpdateOutput?.clients?.data?.map((client, index) => (
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
                        displayEmpty
                        fullWidth
                        onChange={(e) => {
                            setRavitailleurProgram(e.target.value);
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            programWeeklyUpdateOutput?.ravitailleurs?.data?.map((ravi) => (
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
                >
                    Update
                </Button>
            </div>
        </form>
    );
}
