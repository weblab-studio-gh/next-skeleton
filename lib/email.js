"use server";
import Imap from "imap";
import { simpleParser } from "mailparser";

async function getInbox() {
  const imapserver = new Imap({
    user: "test2@weblabstudio.hu",
    password: "urKwGX?K,0If",
    host: "mail.altarbg1.supremepanelbg1.com",
    port: 993,
    tls: true,
  });

  const inbox = await new Promise((resolve, reject) => {
    imapserver.once("ready", () => {
      imapserver.openBox("INBOX", true, (err, box) => {
        if (err) reject(err);
        resolve(box);
      });
    });
    imapserver.connect();
  });

  const messages = await new Promise((resolve, reject) => {
    const f = imapserver.seq.fetch("1:*", {
      bodies: "",
    });

    const mailChunks = [];

    f.on("message", (msg, seqno) => {
      msg.on("body", (stream) => {
        let buffer = "";
        stream.on("data", (chunk) => {
          buffer += chunk.toString("utf8");
        });
        stream.on("end", () => {
          mailChunks.push(buffer);
        });
      });
    });

    f.once("error", (err) => {
      reject(err);
    });

    f.once("end", () => {
      resolve(mailChunks);
    });
  });

  const parsedEmails = [];

  for (const message of messages) {
    const parsedEmail = await simpleParser(message);
    parsedEmails.push(parsedEmail);
  }
  imapserver.end();

  const unit8obj = parsedEmails[0];

  const returnArray = () => {
    const arr = parsedEmails.map((email) => {
      const {
        headers,
        headerLines,
        html,
        text,
        textAsHtml,
        subject,
        date,
        to,
        from,
        messageId,
        replyTo,
      } = email;

      let { attachments } = email;

      // convert image and document attachments to readable format
      const att = email.attachments.map((attachment) => {
        const { filename, contentType, contentDisposition } = attachment;
        const data = attachment.content.toString("base64");
        return {
          filename,
          contentType,
          contentDisposition,
          data,
        };
      });
      attachments = att;

      const obj = {
        attachments,
        headers,
        headerLines,
        html,
        text,
        textAsHtml,
        subject,
        date,
        to,
        from,
        messageId,
        replyTo,
      };

      return obj;
    });
    return arr;
  };

  const res = returnArray();
  return res;
}

function deleteEmail(id) {
  const imapserver = new Imap({
    user: "test2@weblabstudio.hu",
    password: "urKwGX?K,0If",
    host: "mail.altarbg1.supremepanelbg1.com",
    port: 993,
    tls: true,
  });

  imapserver.end();
}

export { getInbox, deleteEmail };

// user: "test@weblabstudio.hu",
// password: "9*oD!{5aH@jX",
// host: "mail.altarbg1.supremepanelbg1.com",
[
  "attachments",
  "headers",
  "headerLines",
  "html",
  "text",
  "textAsHtml",
  "subject",
  "date",
  "to",
  "from",
  "messageId",
  "replyTo",
];
