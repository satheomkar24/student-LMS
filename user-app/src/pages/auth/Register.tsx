import { RegisterForm, type IRegister } from "@satheomkar24/common-types";

const Register = () => {
  const handleSubmit = async (values: IRegister) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = values;
    console.log(values, payload);
  };
  return <RegisterForm onSubmit={handleSubmit} />;
  // return (
  //   <>
  //     <section className="bg-primary-main">
  //       <Container>
  //         <Row className="justify-content-center align-items-center min-vh-100">
  //           <Col lg={6}>
  //             <Card className="">
  //               <CardBody>
  //                 <h3 className="text-center mb-3 primary-blue">Register</h3>
  //                 <Formik
  //                   initialValues={initialValues}
  //                   onSubmit={handleSubmit}
  //                   validationSchema={registerValidationSchema}
  //                 >
  //                   {({ errors, touched }) => (
  //                     <Form>
  //                       <FormGroup className="mb-3">
  //                         <Label for="name">Name</Label>
  //                         <Field
  //                           className={`form-control ${
  //                             touched.name && errors.name ? "is-invalid" : ""
  //                           }`}
  //                           id="name"
  //                           name="name"
  //                           type="text"
  //                         />
  //                         <ErrorMessage
  //                           name="name"
  //                           component="div"
  //                           className="text-danger"
  //                         />
  //                       </FormGroup>
  //                       <FormGroup>
  //                         <Field type="checkbox" name="checked" value="One" />
  //                         One
  //                       </FormGroup>
  //                       <FormGroup className="mb-3">
  //                         <Label for="email">Email</Label>
  //                         <Field
  //                           className={`form-control ${
  //                             touched.name && errors.name ? "is-invalid" : ""
  //                           }`}
  //                           id="email"
  //                           name="email"
  //                           type="email"
  //                         />
  //                         <ErrorMessage
  //                           name="email"
  //                           component="div"
  //                           className="text-danger"
  //                         />
  //                       </FormGroup>
  //                       <FormGroup className="mb-3">
  //                         <Label for="password">Password</Label>
  //                         <Field
  //                           className={`form-control ${
  //                             touched.name && errors.name ? "is-invalid" : ""
  //                           }`}
  //                           id="password"
  //                           name="password"
  //                           type="password"
  //                         />
  //                         <ErrorMessage
  //                           name="password"
  //                           component="div"
  //                           className="text-danger"
  //                         />
  //                       </FormGroup>
  //                       <FormGroup className="mb-3">
  //                         <Label for="confirmPassword">Confirm Password</Label>
  //                         <Field
  //                           className={`form-control ${
  //                             touched.name && errors.name ? "is-invalid" : ""
  //                           }`}
  //                           id="confirmPassword"
  //                           name="confirmPassword"
  //                           type="password"
  //                         />
  //                         <ErrorMessage
  //                           name="confirmPassword"
  //                           component="div"
  //                           className="text-danger"
  //                         />
  //                       </FormGroup>
  //                       <div className="text-center">
  //                         <Button type="submit" color="warning">
  //                           Register
  //                         </Button>
  //                       </div>
  //                     </Form>
  //                   )}
  //                 </Formik>
  //               </CardBody>
  //             </Card>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </section>
  //   </>
  // );
};

export default Register;
