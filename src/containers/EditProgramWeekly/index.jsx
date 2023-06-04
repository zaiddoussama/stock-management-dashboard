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
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const key = updateProgramWeeklyStore;

export default function EditProgramWeekly() {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const programWeeklyUpdateOutput = useSelector((state) => state?.[updateProgramWeeklyStore]) || initialState;

    useEffect(() => {
        dispatch(getProgramWeekly(parseInt(window.location.href.split("/").at(-1))));
    }, []);

    const [startDate, setStartDate] = useState();

    const [clientsProgram, setClients] = useState([]);
    const [associatedClients, setAssociatedClients] = useState([]);
    const [ravitailleurProgram, setRavitailleurProgram] = useState("");
    const [ravitailleurUserName, setRavitailleurUserName] = useState("");
    const [note, setNote] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    const classes = useStyles();

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleClientsChange = (event) => {
        const value = event.target.value;
        setClients(value);
        setAssociatedClients(value);
    };

    const onUpdateButtonClick = (event) => {
        event.preventDefault();
            dispatch(
                updateProgramWeekly({
                    idProgramme: parseInt(window.location.href.split("/").at(-1)),
                    dateDebutProgramme: startDate,
                    description: note,
                    idRavitailleur: ravitailleurProgram,
                    clients: clientsProgram.map((id) => {
                        return { idClient: id };
                    }),
                })
        );
        setShowSuccessAlert(true);
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
        setStartDate(dayjs(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.dateDebutProgramme) || new Date());
        setNote(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.description || "");
        setRavitailleurProgram(() => {
            const username = programWeeklyUpdateOutput?.currentProgramWeekly?.data?.ravitailleur?.username;
            const ravitailleur = programWeeklyUpdateOutput?.ravitailleurs?.data?.find(ravi => ravi.username === username);
            return ravitailleur ? ravitailleur.idRavitailleur : "";
        });
        setRavitailleurUserName(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.ravitailleur?.username || "");
        setClients(programWeeklyUpdateOutput?.clients?.data?.map(client => client.idClient));
        setAssociatedClients(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.clients?.map(client => client.idClient) || []);
    }, [programWeeklyUpdateOutput?.clients?.data, programWeeklyUpdateOutput?.currentProgramWeekly, programWeeklyUpdateOutput?.ravitailleurs?.data]);

    console.log(programWeeklyUpdateOutput?.currentProgramWeekly?.data?.[0]?.ravitailleur.nom);

        useEffect(() => {
        let timeoutId;
        if (showSuccessAlert) {
          timeoutId = setTimeout(() => {
              setShowSuccessAlert(false);
              navigate(-1);
          }, 1000); // less than 10 seconds
        }
        return () => clearTimeout(timeoutId);
      }, [showSuccessAlert]);

    return (

        <form className="new-program-container">
            {(programWeeklyUpdateOutput?.ravitailleurs?.loading || programWeeklyUpdateOutput?.clients?.loading ||
                programWeeklyUpdateOutput?.currentProgramWeekly?.loading) && <Loader />}

            {(programWeeklyUpdateOutput?.ravitailleurs?.error || programWeeklyUpdateOutput?.clients?.error ||
                programWeeklyUpdateOutput?.currentProgramWeekly?.error) && (
                    <AlertPopup type="error" message="a problem occured" />
                )}

            {showSuccessAlert && programWeeklyUpdateOutput?.success && (
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
                        value={associatedClients}
                        onChange={handleClientsChange}
                        renderValue={(associatedClients) => associatedClients.join(", ")}
                    >

                        {programWeeklyUpdateOutput?.clients?.data?.map((client, index) => (
                            <MenuItem key={index} value={client?.idClient}>
                                <ListItemIcon>
                                    <Checkbox checked={clientsProgram && clientsProgram.indexOf(client.idClient) > -1} />
                                </ListItemIcon>
                                <ListItemText primary={client?.nom} />
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </div>
            <div className="new-program-select-ravitailleur-container">
                         <FormControl variant="outlined" sx={{ m: 1, minWidth: 180 }}>
  <InputLabel id="demo-simple-select-filled-label">Ravitailleur</InputLabel>
  <Select
    labelId="demo-simple-select-filled-label"
    id="demo-simple-select-filled"
    value={ravitailleurUserName}
    label="Ravitailleur"
    displayEmpty
    fullWidth
    onChange={(e) => {
      const ravitailleur = programWeeklyUpdateOutput?.ravitailleurs?.data?.find(ravi => ravi.username === e.target.value);
      const idRavitailleur = ravitailleur ? ravitailleur.idRavitailleur : "";
        setRavitailleurProgram(idRavitailleur);
        setRavitailleurUserName(e.target.value);
    }}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    {
      programWeeklyUpdateOutput?.ravitailleurs?.data?.map((ravi) => (
        <MenuItem
          key={ravi.username}
          value={ravi.username}>
          {ravi.username}
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
                    onClick={onUpdateButtonClick}
                >
                    Update
                </Button>
            </div>
        </form>
    );
}
