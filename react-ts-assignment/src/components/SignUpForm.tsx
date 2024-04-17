import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import Form from "@rjsf/core";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";

const schema: RJSFSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "User",
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
        current_location: {
          title: "Current Location",
          type: "string",
        },
        id: {
          type: "array",
          items: {
            type: "object",
            properties: {
              aadhar_card_number: {
                title: "Aadhar Card Number",
                type: "string",
                minLength: 12,
                maxLength: 12,
                pattern: "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$",
              },
              pan_card: {
                title: "Pan Card",
                type: "string",
                minLength: 10,
                maxLength: 10,
                pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
              },
              voter_id: {
                title: "Voter Id",
                type: "string",
                minLength: 10,
                maxLength: 10,
                pattern: "^[A-Z]{3}[0-9]{7}$",
              },
              driving_license: {
                title: "Driving License",
                type: "string",
                minLength: 16,
                maxLength: 16,
                pattern:
                  "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$",
              },
            },
            additionalItems: false,
          },
          minItems: 1,
          uniqueItems: true,
        },
        mobile_number: {
          title: "Mobile Number",
          type: "object",
          properties: {
            country_code: {
              title: "Country Code",
              type: "string",
              pattern: "",
            },
            number: {
              title: "Number",
              type: "string",
              pattern:
                "(?:([+]\\d{1,4})[-.\\s]?)?(?:[(](\\d{1,3})[)][-.\\s]?)?(\\d{1,4})[-.\\s]?(\\d{1,4})[-.\\s]?(\\d{1,9})",
            },
          },
          additionalItems: false,
        },
      },
      required: [
        "name",
        "date_of_birth",
        "gender",
        "current_location",
        "id",
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
          certification: {
            title: "Certification",
            type: "string",
            format: "data-url",
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
            if: {
              properties: {
                mode_of_job: { const: "Remote" },
              },
            },
            then: {
              not: { required: ["prefered_job_location"] },
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
  },
};

export default function SignUpForm() {
  return (
    <div>
      <Form schema={schema} uiSchema={uiSchema} validator={validator} />
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
