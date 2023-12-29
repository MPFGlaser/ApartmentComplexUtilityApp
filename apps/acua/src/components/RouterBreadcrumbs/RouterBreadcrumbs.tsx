import { Link, LinkProps, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { breadcrumbNameMap } from '../../routes/routes';

/* eslint-disable-next-line */
export interface BreadcrumbsProps {}

export function RouterBreadcrumbs(props: BreadcrumbsProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the Not Found page
  if (location.pathname === '/not-found') {
    return null;
  }

  interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
  }

  function LinkRouter(props: LinkRouterProps) {
    return <Link {...props} component={NavLink as any} />;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const route = breadcrumbNameMap.find((route) =>
          route.path.includes(value)
        );
        const to = `/${pathnames
          .slice(0, route?.hasDynamicPart ? index : index + 1)
          .join('/')}`;

        let last = index === pathnames.length - 1;

        if (route?.hasDynamicPart) {
          last = index === pathnames.length - 2;

          // remove the last entry in pathnames
          pathnames.pop();
        }

        return last ? (
          <Typography color="text.primary" key={to}>
            {route?.breadcrumbName}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {route?.breadcrumbName}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default RouterBreadcrumbs;
