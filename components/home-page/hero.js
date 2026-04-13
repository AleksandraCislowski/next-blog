import Image from "next/image";
import classes from "../../styles/hero.module.css";
import coastalScene from "../../public/images/site/coastal-scene.png";

function Hero() {
  return (
    <section className={classes.hero}>
      <Image
        className={classes.image}
        src={coastalScene}
        alt='An illustrated coastal landscape for Elsewhere Log.'
        fill
        priority
        sizes='100vw'
      />
      <div className={classes.overlay} />
      <div className={classes.content}>
        <h1>Elsewhere Log</h1>
        <p>Travel notes from places worth remembering.</p>
        <a href='#featured-notes'>Read the notes</a>
      </div>
    </section>
  );
}
export default Hero;
