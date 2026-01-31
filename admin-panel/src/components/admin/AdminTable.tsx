import { Table } from "reactstrap";
import useAdminResolver from "../../resolvers/AdminResolver";
import moment from "moment";

const AdminTable = () => {
  const { admins } = useAdminResolver();
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
        {admins.map((admin, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{admin.name}</td>
            <td>{admin.email}</td>
            <td>
              <div className="avatar">
                <img
                  src={admin.image}
                  alt="Profile"
                  className="rounded-circle bg-warning object-fit-cover"
                  width="40"
                  height="40"
                />
              </div>
            </td>
            <td>{moment(admin.createdAt).format("MM/DD/YYYY")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminTable;
