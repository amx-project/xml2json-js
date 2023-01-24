import { XML } from "https://js.sabae.cc/XML.js";

const xml = await Deno.readTextFile("03201-4000-1.xml");
const json = XML.toJSON(xml);

const simplifyXMLJSON = (json) => {
  if (Array.isArray(json)) {
    for (let i = 0; i < json.length; i++) {
      json[i] = simplifyXMLJSON(json[i]);
    }
    return json;
  } else if (typeof json == "string") {
    return json;
  } else if (typeof json == "object") {
    //console.log(Object.keys(json));
    if (Object.keys(json).length == 1) {
      const s = json["#text"];
      if (s) {
        return s;
      }
    }
    for (const name in json) {
      json[name] = simplifyXMLJSON(json[name]);
    }
    return json;
  } else {
    return json;
  }
};
const json2 = simplifyXMLJSON(json);
await Deno.writeTextFile("test.json", JSON.stringify(json2, null, 2));
