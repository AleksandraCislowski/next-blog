import Image from "next/image";
import classes from "../../styles/hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <Image
        className={classes.image}
        src='/images/site/me.jpg'
        alt='An image showing Aleksandra - owner of this blog.'
        width={300}
        height={300}
      />
      <h1>Elsewhere Log</h1>
      <p>Travel notes from places worth remembering.</p>
    </section>
  );
}
export default Hero;
