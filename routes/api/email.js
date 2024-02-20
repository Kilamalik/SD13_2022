const express = require("express");
const router = express.Router();

const Email = require("../../model/Email");

router.get("/", async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:email", async (req, res) => {
  try {
    const paraEmail = req.params.email;
    const Femail = await Email.find({ sendersEmail: paraEmail });
    console.log(Femail);
    if (!Femail) {
      return res.status(404).json({ msg: "Emails Not Found" });
    }
    res.json(Femail);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "String") {
      return res.status(404).json({ msg: "Emails not found" });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/remove/:email", async (req, res) => {
  try {
    const paraEmail = req.params.email;
    const Remail = await Email.remove({ sendersEmail: paraEmail });
    res.json(Remail);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "String") {
      return res.status(404).json({ msg: "Email was not removed" });
    }
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  let { emailID, sendersEmail, receiversEmail, subject, content, sentDate } =
    req.body;

  try {
    let date = new Date();
    sentDate = date.toISOString().slice(0, 10);

    emails = new Email({
      emailID: emailID,
      sendersEmail: sendersEmail,
      receiversEmail: receiversEmail,
      subject: subject,
      content: content,
      sentDate: sentDate,
    });
    console.log(emails);
    await emails.save();
    res.json(emails);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
