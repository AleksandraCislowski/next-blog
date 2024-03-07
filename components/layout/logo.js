import classes from "../../styles/logo.module.css";
import icon from "../../public/images/site/travel.png";
import Image from "next/image";

function Logo() {
  return (
    <div className={classes.logo}>
      <Image
        src={icon}
        alt='A plane  flying around the globe icon'
        width={60}
        height={60}
      />
      <h4>Alex's Travel Blog</h4>
    </div>
  );
}

export default Logo;

// Icon source:
// 'https://www.flaticon.com/free-icons/travel'
