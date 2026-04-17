import { Fragment } from "react";
import Head from "next/head";
import classes from "../styles/contact.module.css";

const contactEmail = "cislowski.aleksandra@gmail.com";
const emailSubject = "Hello from Elsewhere Log";

function ContactPage() {
  const mailLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
    emailSubject
  )}`;

  return (
    <Fragment>
      <Head>
        <title>Contact | Elsewhere Log</title>
        <meta
          name='description'
          content='Get in touch about travel notes, frontend work, and small useful tools.'
        />
      </Head>
      <main className={classes.contact}>
        <section className={classes.hero}>
          <p className={classes.eyebrow}>Contact</p>
          <h1>Let&apos;s talk about travel, frontend work, or useful little tools.</h1>
          <p>
            I like thoughtful projects, places with a story, and tools that make
            everyday things easier. Send a note if you want to connect.
          </p>
          <div className={classes.actions}>
            <a className={classes.primaryAction} href={mailLink}>
              Send an email
            </a>
            <a className={classes.secondaryAction} href='/posts'>
              Browse travel notes
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
