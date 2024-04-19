import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import "./SignUpForm.css";
//import React from "react";
import { useNavigate } from "react-router-dom";
import { setUsers } from "./LocalStorage";
//import PositionedSnackbar from "./snakbar";
import * as React from 'react';
//import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const schema: RJSFSchema = {
  definitions: {},
  title: "Create User",
  type: "object",
  properties: {
    personal_details: {
      title: "Personal Details",
      type: "object",
      properties: {
        name: {
          title: "Name",
          type: "string",
          minLength: 3,
          maxLength: 25,
        },
        date_of_birth: {
          title: "Date of Birth",
          type: "string",
          format: "date",
        },

        gender: {
          title: "Gender",
          type: "string",
          enum: ["Male", "Female", "Others"],
        },
        address: {
          title: "Address",
          type: "string",
          maxLength: 150,
        },
        Pin_code: {
          title: "pin code",
          type: "string",
          pattern: "\\d{6}",
        },
        id_proof: {
          title: "Identity Proof",
          type: "object",
          properties: {
            type: {
              title: "Select id type",
              type: "string",
              enum: ["Aadhar", "Voter-ID", "PAN", "Driving-License"],
            },
            number: {
              title: "Enter id proof number",
              type: "string",
            },
          },
          required: ["type", "number"],
        },
        mobile_number: {
          title: "Mobile Number",
          type: "object",
          properties: {
            country_code: {
              title: "Enter Country Code",
              type: "string",
              pattern: "^\\+[1-9][0-9]{0,2}$",
            },
            number: {
              title: "Enter mobile Number",
              type: "string",
              pattern:
                "(?:[(](\\d{1,3})[)][-.\\s]?)?(\\d{1,4})[-.\\s]?(\\d{1,4})[-.\\s]?(\\d{1,9})",
            },
          },
          required: ["country_code", "number"],
          //additionalItems: false,
        },
      },
      required: [
        "name",
        "date_of_birth",
        "gender",
        "Pin_code",
        "id_proof",
        "mobile_number",
      ],
      additionalProperties: false,
    },
    education_qualifications: {
      title: "Education Qualifications",
      type: "object",

      properties: {
        education_summary: {
          title: "Education Summary",
          type: "string",
          enum: ["SSC", "HSC", "Diploma", "Undergraduate", "Postgraduate"],
        },
      },
    },
    Job_preferences: {
      title: "Job Preferences",
      type: "object",
      properties: {
        role: {
          title: "Role",
          type: "string",
          enum: ["Entry-level", "Associate", "Senior", "HR"],
        },
        type: {
          title: "Type",
          type: "string",
          enum: ["Internship", "Full-time", "Part-time"],
        },
        mode: {
          title: "Mode",
          type: "string",
          enum: ["On-site", "Remote", "Hybrid"],
        },
        location: {
          title: "Location",
          enum: ["Banglore", "Hydrabad", "Mumbai", "Pune"],
        },
      },
      additionalItems: false,
    },
  },
  required: ["personal_details"],
};

const uiSchema: UiSchema = {
  "ui:rootFieldId": "myform",
  "ui:classNames": "form-sections",

  personal_details: {
    "ui:classNames": "form-section",
    address: {
      "ui:widget": "textarea",
    },
    date_of_birth: {
      yearsRange: [1980, 2006],
      format: "MDY",
    },
    id_proof: {
      "ui:classNames": "textsection",
    },
    mobile_number: {
      "ui:classNames": "textsection",
      country_code: {
        "ui:help": "Country code should start with '+'  (ex: +91)",
      },
    },
  },
  education_qualifications: {
    "ui:classNames": "form-section",
  },
  Job_preferences: {
    "ui:classNames": "form-section",
  },
};

export default function SignUpForm() {
  const [formData, setFormData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  function handleSubmit() {
    setOpen(true);
    setUsers(formData);
    //navigate("/");
  }
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate("/");
  };
  function handleClick(){
    navigate("/")

  }

  return (
    <div>
      <button className="backbutton" onClick={handleClick}>Home</button>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        className="signupform"
        onSubmit={handleSubmit}
        formData={formData}
        onChange={(e) => setFormData(e.formData)}
        showErrorList={"bottom"}
      >
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="button">
            Submit
          </button>
          
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="User created successfully"
          />
      </Form>
    </div>
  );
}
