import { Fragment } from "react";
import classes from "../styles/contact.module.css";
import Seo from "../components/seo/seo";

const contactEmail = "cislowski.aleksandra@gmail.com";
const emailSubject = "Hello from Elsewhere Log";
const portfolioUrl = "https://aleksandracislowski.com";

function ContactPage() {
  const mailLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
    emailSubject
  )}`;

  return (
    <Fragment>
      <Seo
        title='Contact'
        description='Get in touch about travel notes, frontend work, and small useful tools.'
        path='/contact'
        image='/images/site/desert-road.png'
      />
      <main className={classes.contact}>
        <section className={classes.hero}>
          <p className={classes.eyebrow}>Contact</p>
          <h1>Let&apos;s talk about travel, frontend work, or useful little tools.</h1>
          <p>
            I like thoughtful projects, places with a story, and tools that make
            everyday things easier. If you want the bigger picture, my portfolio
            has more of the work I am proud of.
          </p>
          <div className={classes.actions}>
            <a className={classes.primaryAction} href={mailLink}>
              Send an email
            </a>
            <a className={classes.secondaryAction} href={portfolioUrl}>
              Visit my portfolio
            </a>
          </div>
          <p className={classes.emailNote}>
            Current contact address: <span>{contactEmail}</span>
          </p>
        </section>
      </main>
    </Fragment>
  );
}

export default ContactPage;
