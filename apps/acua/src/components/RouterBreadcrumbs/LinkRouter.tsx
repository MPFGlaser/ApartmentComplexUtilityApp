import { Link, LinkProps } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

export function LinkRouter(props: Readonly<LinkRouterProps>) {
  return <Link {...props} component={NavLink} />;
}
