import crypto from "crypto";
import {
  loadLinks,
  insertShortLink,
  getLinkByShortCode,
} from "../models/shortener.model.js";

// to display data in page like shortend url .....
export const getURLShortner = async (req, res) => {
  try {
    const links = await loadLinks();

    return res.render("index", {
      links,
      host: req.host,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(" get Internal Server Error");
  }
};

// get data from user
export const postURLShortner = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    const existing = await getLinkByShortCode(finalShortCode);

    if (existing) {
      return res
        .status(400)
        .send(
          `<h1>URL with that shortcode already exists, please choose another <a href="/">Go Back</a></h1>`,
        );
    }

    await insertShortLink({ url, shortCode: finalShortCode });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("post Internal Server Error");
  }
};

export const redirectToShortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await getLinkByShortCode(shortCode);
    if (!link) {
      return res.redirect("/404");
    }

    // const links = await loadLinks()
    // if (!links[shortCode]) {
    //   return res.status(404).send("Short URL not found");
    // }

    return res.redirect(link.url);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
