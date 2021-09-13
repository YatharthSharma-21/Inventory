import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../../Common/Button/Button";

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
import validate from "../../../../../utils/validate";

import {
  AddItems, 
  updateItem,
} from "../../../../../redux/actions/BPAction";

const AddItem = ({ heading, partner }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const partnerRef = useRef(null);

  //Redux
  const { user } = useSelector((state) => state.auth);
  // const isAdmin = user.role.includes("admin");

  //State
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isError, setIsError] = useState(false);
  
  const [partnerType, setPartnerType] = useState(partner?.type || "Individual");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",    
  };

  const [regData, setRegData] = useState(initialState);

  const {
    name, //
    description,
    price,
    quantity,
    image
  } = regData;

  

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
      label: "Description",
      name: "description",
      type: "text",
      value: description,
      maxLength: 320,
      // isDisabled: !isAdmin,
    },
    {
      id: 2,
      label: "Price",
      name: "price",
      type: "text",
      value: price,
      maxLength: 12,
    },
    
    { id: 3, label: "Quantity", name: "quantity", type: "text", value: quantity },
    { id: 4, label: "Image", name: "image", type: "file", value: image },
   
  ];


  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsError(true);

    console.log(regData)
    const formData = new FormData();

    Object.keys(regData).forEach((key) => {
      if (key !== "docs" && key !== "hospitals") {
        if (regData[key]) formData.set(key, regData[key]);
      }
    });   

    formData.set("type", partnerType);  

    if (heading === "Add Item")
      dispatch(AddItems(formData, history));
    else dispatch(updateItem(partner._id, formData));

    partnerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      ref={partnerRef}
      className="createPartner"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h1>{heading}</h1>
      <br />
      <h3>Item Information : </h3>

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
            <FormControl key={id} style={{display:'flex',marginRight:'20px',width:'50%'}}>
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
                <></>
                // <Autocomplete
                //   value={value}
                //   options={options}
                //   renderInput={(params) => (
                //     <TextField {...params} label={label} />
                //   )}
                //   onChange={(event, newValue) => {
                //     handleAutoCompChange(newValue, name);
                //   }}
                // />
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
      
      
      <Button text={heading} type="submit" />
    </form>
  );
};

export default AddItem;
