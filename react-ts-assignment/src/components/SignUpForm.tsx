import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { setUsers } from "./LocalStorage";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { AppBar, Box, Toolbar } from "@mui/material";
import { FormEvent } from "react";
import { IChangeEvent } from "@rjsf/core";


import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

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
        pin_code: {
          title: "Pin code",
          type: "string",
          pattern: "\\d{6}",
        },
        email: {
          title: "Email",
          type: "string",
          format: "email",
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
          if: {
            properties: { type: { const: "Aadhar" } },
          },
          then: {
            properties: {
              number: {
                pattern: "^[2-9]{1}[0-9]{3}\\s?[0-9]{4}\\s?[0-9]{4}$",
              },
            },
          },
          else: {
            if: {
              properties: { type: { const: "Voter-ID" } },
            },
            then: {
              properties: {
                number: {
                  pattern: "^[A-Z]{3}[0-9]{7}$",
                },
              },
            },
            else: {
              if: {
                properties: { type: { const: "PAN" } },
              },
              then: {
                properties: {
                  number: {
                    pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                  },
                },
              },
              else: {
                if: {
                  properties: { type: { const: "Driving-License" } },
                },
                then: {
                  properties: {
                    number: {
                      pattern: "^[0-9]{15}$",
                    },
                  },
                },
              },
            },
          },
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
        },
      },
      required: [
        "name",
        "date_of_birth",
        "gender",
        "pin_code",
        "email",
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
    created_date: {
      title: "Created Date",
      type: "string",
      format: "date-time", 
      readOnly: true,
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
      yearsRange: [1970, 2006],
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
  created_date: {
    "ui:widget": "hidden", 
  },
};

export default function SignUpForm() {
  const [formData, setFormData] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  console.log("funct")
  function handleSubmit(data: IChangeEvent<any, RJSFSchema, any>, event: FormEvent<any>) {
    formData.created_date = new Date()
    setOpen(true);
    setUsers(formData);
    //navigate("/");
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate("/");
  };
  function handleClick() {
    navigate("/");
  }

  function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <button className="backbutton" onClick={handleClick}>
              <HomeIcon className="homeicon" />
              Home
            </button>
          </Toolbar>
        </AppBar>
      </Box>

      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        className="signupform"
        onSubmit={handleSubmit}
        formData={formData}
        onChange={(e) => setFormData(e.formData)}
        showErrorList={false}
        // liveValidate={true}
        focusOnFirstError={true}
      >
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="button">
            Submit
          </button>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="User created successfully"
        />
      </Form>
    </div>
  );
}
