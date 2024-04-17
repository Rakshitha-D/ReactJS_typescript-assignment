import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import "./SignUpForm.css";
const schema: RJSFSchema = {
  definitions: {},
  title: "User Details",
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
          maxLength: 50,
          maxLength: 40,
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
        current_location: {
          title: "Current Location",
          type: "string",
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
              title: "Enter id number",
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
        "current_location",
        "id_proof",
        "mobile_number",
      ],
      additionalProperties: false,
    },
    education_qualifications: {
      title: "Education Qualifications",
      type: "array",
      items: {
        type: "object",
        properties: {
          education_summary: {
            title: "Education Summary",
            type: "string",
            enum: ["SSC", "HSC", "Diploma", "Undergraduate", "Postgraduate"],
          },
        },
      },
      additionalProperties: false,
    },
    preferences: {
      type: "object",
      properties: {
        job: {
          type: "object",
          properties: {
            job_role: {
              type: "string",
              enum: ["Entry-level", "Associate", "Senior", "HR"],
            },
            job_type: {
              type: "string",
              enum: ["Internship", "Full-time", "Part-time"],
            },
            mode_of_job: {
              type: "string",
              enum: ["On-site", "Remote", "Hybrid"],
            },
            prefered_job_location: {
              type: "integer",
            },
          },
          additionalItems: false,
        },
      },
      additionalProperties: false,
    },
  },
  required: ["personal_details", "education_qualifications", "preferences"],
  additionalProperties: false,
};

const uiSchema: UiSchema = {
  personal_details: {
    address: {
      "ui:widget": "textarea",
    },
    mobile_number: {
      country_code: {
        "ui:help": "Country code should start with '+'  (ex: +91)",
      },
    },
  },
};

export default function SignUpForm() {
  function handleSubmit() {
    alert("submitted");
  }
  return (
    <div>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        className="signupform"
        onSubmit={handleSubmit}
      />
      {/*  
      <form action="">
        <TextField
          label="Name"
          variant="outlined"
          placeholder="Enter your name"
        />
        <TextField label="Date of Birth" variant="outlined" type="date" />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form> 
      */}
    </div>
  );
}
