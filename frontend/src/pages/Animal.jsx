import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    backButton: {
        margin: theme.spacing(2),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        minWidth: 120,
    },
    formCheckControl: {
        margin: theme.spacing(3),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SelectType() {
    const classes = useStyles();

    return (
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
            <InputLabel id="selectType">เลือกประเภทสัตว์</InputLabel>
            <Select
                labelId="selectType-outlined-label"
                id="selectType-outlined"
                // value={value.type}
                // onChange={handleChange}
                label="เลือกประเภทสัตว์"
            >
                <MenuItem value={'วัว'}>วัว</MenuItem>
                <MenuItem value={'แมว'}>หมา</MenuItem>
                <MenuItem value={'หมา'}>แมว</MenuItem>
            </Select>
        </FormControl>
    )
}

function SelectFood() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        gilad: false,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { gilad, jason, antoine } = state;

    return (
        <FormControl component="fieldset" className={classes.formCheckControl}>
            <FormLabel component="legend">เลือกอาหารสัตว์</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                    label="Gilad Gray"
                />
                <FormControlLabel
                    control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                    label="Jason Killian"
                />
                <FormControlLabel
                    control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                    label="Antoine Llorca"
                />
            </FormGroup>
        </FormControl>
    )
}

function AddDetail() {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-02-18T09:00:00'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <FormControl fullWidth variant="outlined" className={classes.selectEmpty}>
                <TextField
                    required
                    id="outlined-required1"
                    label="ชื่อสัตว์"
                    variant="outlined"
                    autoFocus
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.selectEmpty}>
                <TextField
                    required
                    id="outlined-required2"
                    type="number"
                    label="จำนวน (ตัว)"
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.selectEmpty}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    required
                    margin="normal"
                    id="date-picker-dialog"
                    label="วันที่เพิ่มเข้าฟาร์ม"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    required
                    ampm={false}
                    margin="normal"
                    id="time-picker"
                    label="เวลา"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
                </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.selectEmpty}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="ข้อมูลอื่นๆ"
                    multiline
                    rowsMax={4}
                    rows={2}
                    value={value}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
        </div>
    )
}

function getSteps() {
    return ['ประเภทสัตว์', 'อาหารสัตว์', 'รายละเอียดสัตว์'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <SelectType />;
        case 1:
            return <SelectFood />;
        case 2:
            return <AddDetail />;
        default:
            return 'อะไรวะ';
    }
}
export default function Animal() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <div className={classes.root}>
                    <Typography variant="h4" component="h1" align='center' gutterBottom>
                        เพิ่มสัตว์
                    </Typography>
                    <Container component={Paper}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>เสร็จแล้วเด้อ</Typography>
                                    <Button onClick={handleReset}>รีเซ็ต</Button>
                                </div>
                            ) : (
                                    <div>
                                        <Box className={classes.instructions}>
                                            {getStepContent(activeStep)}
                                        </Box >
                                        <Box>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                กลับ
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'เพิ่ม' : 'ถัดไป'}
                                            </Button>
                                        </Box>
                                    </div>
                                )}
                        </div>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
}