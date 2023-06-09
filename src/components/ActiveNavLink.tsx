import { useMatch, Link, LinkProps } from "react-router-dom";

interface ActiveNavLinkProps extends LinkProps {
  activeClassName: string;
  to: string;
}

const ActiveNavLink: React.FC<ActiveNavLinkProps> = ({
  to,
  children,
  activeClassName,
  ...rest
}) => {
  const match = useMatch(to);
  return (
    <Link
      to={to}
      {...rest}
      className={match ? `${activeClassName} nav-link` : "nav-link"}
    >
      {children}
    </Link>
  );
};

export default ActiveNavLink;
