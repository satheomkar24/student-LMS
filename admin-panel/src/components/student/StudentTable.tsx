import { Table } from "reactstrap";
import useStudentResolver from "../../resolvers/StudentResolver";
import moment from "moment";

const StudentTable = () => {
  const { students } = useStudentResolver();
  return (
    <Table hover responsive className="align-middle">
      <thead>
        <tr className="table-primary">
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Profile Image</th>
          <th>Registered Date</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>
              <div className="avatar">
                <img
                  src={student.image}
                  alt="Profile"
                  className="rounded-circle bg-warning object-fit-cover"
                  width="40"
                  height="40"
                />
              </div>
            </td>
            <td>{moment(student.createdAt).format("MM/DD/YYYY")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
