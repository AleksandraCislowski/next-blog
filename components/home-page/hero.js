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
      <h1>Hello, my name is Aleksandra!</h1>
      <p>I blog about my travels.</p>
    </section>
  );
}
export default Hero;
