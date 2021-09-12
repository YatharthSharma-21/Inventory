import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  createPartner,
  getPartner,
  updatePartner,
} from "../../../../../redux/actions/BPAction";

import Button from "../../../../common/Button/Button";
import DropdownGroup from "../../../../common/DropdownGroup/DropdownGroup";
import FileInput from "../../../../common/FileInput/FileInput";
import InputGroup from "../../../../common/InputGroup/InputGroup";

//Location Data
import csc from "country-state-city";

import "./CreatePartner.css";
import FileInputGrp from "../../../../common/FileInputGrp/FileInputGrp";

//Mat UI
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getToday } from "../../../../../utils/getDateTime";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DocGrp from "../../../../common/DocGrp/DocGrp";
import validate from "../../../../../utils/validate";
import { reqUpEmail } from "../../../../../redux/api";
import { setAlert } from "../../../../../redux/actions/alertAction";

const CreatePartner = ({ heading, partner }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const partnerRef = useRef(null);

  //Redux
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user.role.includes("admin");

  //State
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isError, setIsError] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");

  const [hospitalName, setHospitalName] = useState("");
  const [partnerType, setPartnerType] = useState(partner?.type || "Individual");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState = {
    name: "",
    email: "",
    contact: "",
    mr_no: "",
    country: "",
    state: "",
    city: "",
    address: "",
    VAT: "",
    GST: "",
    CIN: "",
    docs: [],
    website: "",
    hospitals: [],
    bank_info: [],
  };

  const [regData, setRegData] = useState({
    ...initialState,
    ...partner,
    docs: partner
      ? partner.docs.map((d, i) => ({
          id: i,
          fileName: d.name,
          docLink: d.doc,
        }))
      : [],
    bank_info: partner?.bank_info || [], //Temp to be changed in mongoDB
  });

  const {
    name, //
    email,
    contact,
    mr_no,
    address,
    country,
    state,
    city,
    VAT,
    GST,
    CIN,
    docs,
    website,
    hospitals,
    bank_info,
  } = regData;

  useEffect(() => {
    console.log({ hospitals });
  }, [hospitals]);

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });

    switch (e.target.name) {
      case "contact":
        if (!isNaN(e.target.value)) {
          setRegData({ ...regData, [e.target.name]: e.target.value });
        } else
          setRegData({
            ...regData,
            [e.target.name]: e.target.value.slice(0, -1),
          });
        break;

      default:
        setRegData({ ...regData, [e.target.name]: e.target.value });
        break;
    }
  };

  const PartnerDetails = [
    {
      id: 0,
      label: "Name",
      name: "name",
      type: "text",
      value: name,
      maxLength: 250,
    },
    {
      id: 1,
      label: "Email",
      name: "email",
      type: "email",
      value: email,
      maxLength: 320,
      isDisabled: !isAdmin,
    },
    {
      id: 2,
      label: "Contact",
      name: "contact",
      type: "tel",
      value: contact,
      maxLength: 12,
    },
    { id: 3, label: "MR No.", name: "mr_no", type: "tel", value: mr_no },
    {
      id: 4,
      label: "Country.",
      name: "country",
      type: "auto-complete",
      value: country,
      options: csc.getAllCountries().map(({ name }) => name),
    },
    {
      id: 5,
      label: "State",
      name: "state",
      type: "auto-complete",
      options: states.map((st) => st.name),
      value: state,
    },
    {
      id: 6,
      label: "City",
      name: "city",
      type: "auto-complete",
      options: cities.map((ct) => ct.name),
      value: city,
    },
    {
      id: 7,
      label: "Address",
      name: "address",
      type: "text",
      value: address,
      maxLength: 1000,
    },
    { id: 8, label: "VAT", name: "VAT", type: "text", value: VAT },
    { id: 9, label: "CIN", name: "CIN", type: "text", value: CIN },
    { id: 10, label: "GST", name: "GST", type: "text", value: GST },
    {
      id: 11,
      label: "Website URL",
      name: "website",
      type: "text",
      value: website,
    },
  ];

  useEffect(() => {
    // partnerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [initialState]);

  //Location Data Logic

  useEffect(() => {
    const countryCode = csc
      .getAllCountries()
      .find((count) => count.name === country);

    if (countryCode) {
      setStates(csc.getStatesOfCountry(countryCode.isoCode));
      if (states[0]) setRegData({ ...regData, state: states[0].name });
    }
  }, [country]);

  useEffect(() => {
    const countryCode = csc
      .getAllCountries()
      .find((count) => count.name === country);

    if (countryCode) {
      const stateCode = csc
        .getStatesOfCountry(countryCode.isoCode)
        .find((st) => st.name === state);

      if (stateCode) {
        setCities(csc.getCitiesOfState(countryCode.isoCode, stateCode.isoCode));
        if (cities[0]) setRegData({ ...regData, city: cities[0].name });
      }
    }
  }, [state]);

  const handleAutoCompChange = (value, name) => {
    setRegData({ ...regData, [name]: value });
  };

  //Bank Info

  const initBankInfo = {
    ac_no: "",
    bank_name: "",
    swift: "",
    ifsc: "",
  };

  const [bankInfo, setBankInfo] = useState({
    ...initBankInfo,
  });

  const BankDetails = [
    {
      id: 0,
      label: "A/C No.",
      name: "ac_no",
      value: bankInfo.ac_no,
      maxLength: 50,
    },
    {
      id: 1,
      label: "Bank Name",
      name: "bank_name",
      value: bankInfo.bank_name,
      maxLength: 250,
    },
    {
      id: 2,
      label: "Swift Code",
      name: "swift",
      value: bankInfo.swift,
    },
    {
      id: 3,
      label: "IFSC Code",
      name: "ifsc",
      value: bankInfo.ifsc,
    },
  ];

  const handleBankChange = (e) => {
    const { name, value } = e.target;

    setBankInfo({ ...bankInfo, [name]: value });
  };

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsError(true);

    const formData = new FormData();

    Object.keys(regData).forEach((key) => {
      if (key !== "docs" && key !== "hospitals") {
        if (regData[key]) formData.set(key, regData[key]);
      }
    });

    formData.set("bank_info", JSON.stringify(bank_info));

    formData.set("type", partnerType);

    hospitals.forEach((hospital) => {
      formData.append("hospitals[]", hospital);
    });

    docs.forEach((doc) => {
      formData.append(doc.fileName, doc.file || doc.docLink);
      console.log({ name: doc.fileName, file: doc.file || doc.docLink });
      // formData.append(`fileName[]`, doc.fileName);
    });

    if (heading === "Create Partner")
      dispatch(createPartner(formData, history));
    else dispatch(updatePartner(partner._id, formData));

    partnerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const resetEmail = async () => {
    try {
      const { data } = await reqUpEmail({ email: updatedEmail });
      dispatch(setAlert(data?.msg, "success"));
    } catch (error) {
      console.log({ error });
      const err = error.response.data.errors;
      if (err) err.forEach((e) => dispatch(setAlert(e.msg, "danger")));
    }
  };

  return (
    <form
      ref={partnerRef}
      className="createPartner"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h1>{heading}</h1>

      <h3>Partner Details: </h3>

      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="ptype"
            name="ptype1"
            value={partnerType}
            onChange={(e) => setPartnerType(e.target.value)}
            row
          >
            <FormControlLabel
              value="Individual"
              control={<Radio color="primary" />}
              label="Individual"
            />
            <FormControlLabel
              value="Company"
              control={<Radio color="primary" />}
              label="Company"
            />
          </RadioGroup>
        </FormControl>
        <br />
      </div>

      <br />
      <h3>Request Email Update : </h3>

      <div>
        <FormControl>
          <InputLabel htmlFor="updateEmail">Email</InputLabel>
          <Input
            value={updatedEmail}
            name="updatedEmail"
            type="email"
            inputProps={{ maxLength: 320 }}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            error={isError && validate("email", updatedEmail)}
          />
        </FormControl>
        <div className="btn btn-primary req-email-btn" onClick={resetEmail}>
          Request
        </div>
      </div>

      <br />
      <h3>Personal Information : </h3>

      <div>
        {PartnerDetails.map(
          ({
            id,
            label,
            name,
            type,
            value,
            options,
            maxLength,
            isDisabled,
          }) => (
            <FormControl key={id}>
              {!["multi-select", "date", "time", "auto-complete"].includes(
                type
              ) && <InputLabel htmlFor="component-filled">{label}</InputLabel>}
              {type === "select" ? (
                <Select
                  select
                  label={label}
                  value={value}
                  onChange={handleChange}
                  name={name}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : type === "auto-complete" ? (
                <Autocomplete
                  value={value}
                  options={options}
                  renderInput={(params) => (
                    <TextField {...params} label={label} />
                  )}
                  onChange={(event, newValue) => {
                    handleAutoCompChange(newValue, name);
                  }}
                />
              ) : (
                <Input
                  value={value}
                  name={name}
                  type={type}
                  inputProps={{ maxLength: maxLength || 25 }}
                  onChange={handleChange}
                  error={isError && validate(type, value)}
                  disabled={isDisabled}
                />
              )}
            </FormControl>
          )
        )}
      </div>
      <br />
      <br />
      <h3>Hospitals: </h3>
      <div className="hospitalsGrp">
        <Input
          value={hospitalName}
          name="hospital"
          type="text"
          onChange={(e) => setHospitalName(e.target.value)}
          placeholder="Hospital Name"
          inputProps={{ maxLength: 250 }}
        />
        <i
          className="fas fa-plus"
          onClick={() => {
            hospitalName &&
              setRegData({
                ...regData,
                hospitals: [...hospitals, hospitalName],
              });
            setHospitalName("");
          }}
        />
      </div>
      <br />

      <div className="hospitalGrid">
        {hospitals.map((hos) => (
          <div className="hospitalName">
            {hos}
            <i
              className="fas fa-times danger"
              onClick={() =>
                setRegData({
                  ...regData,
                  hospitals: [...hospitals.filter((h) => h !== hos)],
                })
              }
            ></i>
          </div>
        ))}
      </div>
      <br />
      <h3>Documents: </h3>
      <DocGrp
        setFiles={(docs) => setRegData((regData) => ({ ...regData, docs }))}
        files={docs}
      />
      <br />

      <br />
      <h3>Bank Information:</h3>

      <div className="bankDetails">
        {BankDetails.map(({ id, label, name, type, value, maxLength }) => (
          <FormControl key={id}>
            <InputLabel htmlFor="component-filled">{label}</InputLabel>
            <Input
              value={value}
              name={name}
              type={type}
              onChange={handleBankChange}
              inputProps={{ maxLength: maxLength || 25 }}
            />
          </FormControl>
        ))}

        <button
          type="button"
          className="add-btn"
          onClick={() => {
            const { ac_no, bank_name, ifsc, swift } = bankInfo;
            if ((ac_no || bank_name || ifsc || swift) && ac_no)
              setRegData({ ...regData, bank_info: [...bank_info, bankInfo] });
            setBankInfo(initBankInfo);
            console.log({ bank_info });
          }}
        >
          Add Bank
        </button>
        <br />
        {bank_info.map(({ ac_no, bank_name, ifsc, swift }) => (
          <div className="bank_grp">
            <div>Acc. Number : {ac_no}</div>
            <div>Bank Name : {bank_name}</div>
            <div>IFSC : {ifsc}</div>
            <div>SWIFT : {swift}</div>
            <i
              className="fa fa-times danger"
              onClick={() =>
                setRegData({
                  ...regData,
                  bank_info: [
                    ...bank_info.filter(({ ac_no: ac }) => ac !== ac_no),
                  ],
                })
              }
            />
          </div>
        ))}
      </div>
      <Button text={heading} type="submit" />
    </form>
  );
};

export default CreatePartner;
