import { useContext, useState } from "react";
import { FiAlignJustify, FiLogOut, FiUser } from "react-icons/fi";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Logo from "../Logo";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useAdminResolver from "../../../resolvers/AdminResolver";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import { CustomSwal } from "@satheomkar24/common-types";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { adminById } = useAdminResolver({ adminId: user?.id });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  authService.init(navigate, dispatch);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { setShow } = useContext(SidebarContext);

  const handleLogout = async () => {
    const result = await CustomSwal.fire({
      icon: "warning",
      title: "Are you sure you want to logout?",
      confirmButtonText: "Logout",
    });
    if (result.isConfirmed) {
      authService.logout();
    }
  };

  return (
    <>
      <header className="container-fluid shadow py-2 position-sticky top-0 z-1 bg-primary-blue">
        <Navbar>
          <div className="d-flex gap-3 align-items-center">
            <FiAlignJustify
              size={30}
              className="cursor-pointer d-block text-white-50"
              onClick={() => setShow((prev) => !prev)}
            />
            <Logo />
          </div>
          <Nav className="align-items-center gap-2">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                caret={false}
                color="light"
                tag="span"
                className="cursor-pointer"
              >
                <img
                  src={adminById?.image || "/images/avtar.png"}
                  width={40}
                  height={40}
                  className="rounded-circle bg-warning object-fit-cover"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="d-flex align-items-center border-bottom"
                  tag={Link}
                  to="/profile"
                >
                  <FiUser className="primary-orange me-2 fs-5" /> My Profile
                </DropdownItem>
                <DropdownItem
                  className="d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <FiLogOut className="primary-orange me-2 fs-5" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
