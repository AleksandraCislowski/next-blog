import classes from "../../styles/logo.module.css";
import logo from "../../public/images/site/elsewhere-logo-mark.png";
import Image from "next/image";

function Logo() {
  return (
    <div className={classes.logo}>
      <Image
        className={classes.mark}
        src={logo}
        alt='Elsewhere Log logo'
        width={80}
        height={80}
        priority
      />
      <span className={classes.name}>Elsewhere Log</span>
    </div>
  );
}

export default Logo;
