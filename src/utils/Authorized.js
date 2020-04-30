import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */

let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};
/**
 * hard code
 * block need it。
 */




const authority2Number = (string) => {
  let number;
  switch (string) {
    case "ROLE_operator1":
      number = 0;
      break;
    case "ROLE_operator2":
      number = 1;
      break;
    case "ROLE_supervisor":
      number = 2;
      break;
    case "ROLE_manager":
      number = 3;
      break;
    case "ROLE_admin":
      number = 4;
      break;
    default:
      number = -1;
      break;
  }
  return number;
}



window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized, authority2Number };
export default Authorized;