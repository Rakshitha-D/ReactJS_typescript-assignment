import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import "./SignUpForm.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, setUsers } from "./LocalStorage";

const schema: RJSFSchema = {
  definitions: {},
  title: "User Information",
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
      type: "object",

      properties: {
        education_summary: {
          title: "Education Summary",
          type: "string",
          enum: ["SSC", "HSC", "Diploma", "Undergraduate", "Postgraduate"],
        },
      },
    },
    preferences: {
      type: "object",
      properties: {
        job: {
          title: "Job",
          type: "object",
          properties: {
            role: {
              type: "string",
              enum: ["Entry-level", "Associate", "Senior", "HR"],
            },
            type: {
              type: "string",
              enum: ["Internship", "Full-time", "Part-time"],
            },
            mode: {
              type: "string",
              enum: ["On-site", "Remote", "Hybrid"],
            },
            location: {
              enum: ["Banglore", "Hydrabad", "Mumbai", "Pune"],
            },
          },
          additionalItems: false,
        },

        course_preferences: {
          title: "Course",
          type: "array",
          items: {
            type: "object",
            properties: {
              //name: { "type": "string" },
              type: {
                enum: [
                  "Technical-Course",
                  "Business-Course",
                  "Creative-Course",
                  "Language-Course",
                  "Personal-Development-Course",
                  "Hobby-Course",
                ],
              },
              mode: { enum: ["Online", "Offline"] },
              //language: { "enum": ["Kannada", "English", "Telugu", "Tamil", "Hindi", "Other"] }
            },
          },
        },
      },
    },
  },
  required: ["personal_details", "education_qualifications", "preferences"],
};

const uiSchema: UiSchema = {
  "ui:rootFieldId": "myform",

  personal_details: {
    "ui:classNames": "form-section",
    address: {
      "ui:widget": "textarea",
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
  preferences: {
    course_preferences: {
      "ui:classNames": "form-section",
    },
    "ui:classNames": "form-section",
  },
};
export default function SignUpForm() {
  const [formData, setFormData] = React.useState("");
  const navigate = useNavigate();
  function handleSubmit() {
    setUsers(formData);
    alert("submitted");
    navigate("/");
  }

  return (
    <div>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        className="signupform"
        onSubmit={handleSubmit}
        formData={formData}
        onChange={(e) => setFormData(e.formData)}
      />
    </div>
  );
}
