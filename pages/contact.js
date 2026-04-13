import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";
import Head from "next/head";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact | Elsewhere Log</title>
        <meta name='description' content='Send a note to Aleksandra.' />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
