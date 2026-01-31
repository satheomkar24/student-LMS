import {
  renderFieldRowWithSizes,
  type IFormRender,
  type IInstructorPayload,
} from "@satheomkar24/common-types";
import { Form, Formik } from "formik";
import { FiSave } from "react-icons/fi";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import * as Yup from "yup";

type Props = {
  initialValues: IInstructorPayload;
  onSubmit: (values: IInstructorPayload) => Promise<void>;
};

const InstructorForm = ({ initialValues, onSubmit }: Props) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    profession: Yup.string().required("Profession is required"),
    about: Yup.string().required("About is required"),
    image: Yup.string().required("Image link is required"),
    contactDetails: Yup.object({
      email: Yup.string().email().required("Email is required"),
      mobile: Yup.string()
        .required("Mobile number is required")
        .min(10, "Enter valid number")
        .max(10, "Enter valid number")
        .matches(/^[0-9]+$/, "Only numbers are allowed"),
      address: Yup.string().required("Address is required"),
    }),
    socialLinks: Yup.object({
      linkedin: Yup.string().url("Enter valid URL"),
      facebook: Yup.string().url("Enter valid URL"),
      twitter: Yup.string().url("Enter valid URL"),
      instagram: Yup.string().url("Enter valid URL"),
    }),
  });

  const renderBasicInfoFields = (): IFormRender[] => {
    return [
      {
        field: {
          id: "name",
          name: "name",
          type: "text",
          label: "Name",
        },
        colSize: "col-12",
      },
      {
        field: {
          id: "profession",
          name: "profession",
          type: "text",
          label: "Profession",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "image",
          name: "image",
          type: "text",
          label: "Image Link",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "about",
          name: "about",
          type: "textarea",
          label: "About",
        },
        colSize: "col-12",
      },
    ];
  };
  const renderContactFields = (): IFormRender[] => {
    return [
      {
        field: {
          id: "contactDetails.email",
          name: "contactDetails.email",
          type: "email",
          label: "Email",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "contactDetails.mobile",
          name: "contactDetails.mobile",
          type: "text",
          label: "Mobile Number",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "contactDetails.address",
          name: "contactDetails.address",
          type: "text",
          label: "Address",
        },
        colSize: "col-md-12",
      },
    ];
  };
  const renderSocialLinkFields = (): IFormRender[] => {
    return [
      {
        field: {
          id: "socialLinks.linkedin",
          name: "socialLinks.linkedin",
          type: "text",
          label: "LinkedIn",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "socialLinks.facebook",
          name: "socialLinks.facebook",
          type: "text",
          label: "Facebook",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "socialLinks.twitter",
          name: "socialLinks.twitter",
          type: "text",
          label: "Twitter",
        },
        colSize: "col-md-6",
      },
      {
        field: {
          id: "socialLinks.instagram",
          name: "socialLinks.instagram",
          type: "text",
          label: "Instagram",
        },
        colSize: "col-md-6",
      },
    ];
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ submitForm }) => (
          <Form>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fs-3">Instructor Information</p>
              <Button color="success" onClick={submitForm}>
                <FiSave /> Save
              </Button>
            </div>
            <Card className="mb-2">
              <CardHeader>Basic Information</CardHeader>
              <CardBody>
                {renderFieldRowWithSizes(renderBasicInfoFields())}
              </CardBody>
            </Card>
            <Card className="mb-2">
              <CardHeader>Contact Information</CardHeader>
              <CardBody>
                {renderFieldRowWithSizes(renderContactFields())}
              </CardBody>
            </Card>
            <Card className="mb-2">
              <CardHeader>Social links Information</CardHeader>
              <CardBody>
                {renderFieldRowWithSizes(renderSocialLinkFields())}
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InstructorForm;
