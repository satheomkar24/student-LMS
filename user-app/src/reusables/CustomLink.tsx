import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

interface ICustomLink {
  href?: string;
  text: string;
  onClick?: () => void;
  tag?: "a" | "button";
  variant?: "primary" | "secondary";
}
const CustomLink = ({
  href = "#",
  text,
  variant = "primary",
  tag = "a",
  onClick,
}: ICustomLink) => {
  const getTag = () => {
    if (tag === "button") {
      return (
        <Button onClick={onClick} className={`custom-link border-0 ${variant}`}>
          {text} <FiArrowUpRight size={20} />
        </Button>
      );
    }
    if (tag === "a") {
      return (
        <Link to={href} className={`custom-link ${variant}`}>
          {text} <FiArrowUpRight size={20} />
        </Link>
      );
    }
  };
  return getTag();
};

export default CustomLink;
