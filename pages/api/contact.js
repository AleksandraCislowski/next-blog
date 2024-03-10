import { MongoClient } from "mongodb";
import { sendMail } from "../../service/mailService";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGODB_PATH);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("blog-messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
      if (result) {
        await sendMail(
          `${name} sent you a message.`,
          "yenna91@gmail.com",
          `${message} from ${email}`
        );
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
    return res;
  }
}

export default handler;
