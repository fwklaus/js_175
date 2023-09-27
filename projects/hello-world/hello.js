const express = require('express');
const morgan = require('morgan');
const app = express();

const COUNTRY_DATA = [
  {
    path: "/english",
    flag: "flag-of-United-States-of-America.png",
    alt: "US Flag",
    title: "Go to US English site",
  },
  {
    path: "/french",
    flag: "flag-of-France.png",
    alt: "Drapeau de la france",
    title: "Aller sur le site français",
  },
  {
    path: "/serbian",
    flag: "flag-of-Serbia.png",
    alt: "Застава Србије",
    title: "Идите на српски сајт",
  },
];

const LANGUAGE_CODES = {
  english: "en-US",
  french: "fr-FR",
  serbian: "sr-Cryl-rs",
};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(morgan("common"));

// const writeLog = (req, res) => {
//   let timeStamp = String(new Date()).substring(4, 24); // Mmm dd YYYY HH:MM:SS
//   console.log(`${timeStamp} ${req.method} ${req.originalUrl} ${res.statusCode}`);
// };

app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? "current" : "";
};

app.get("/", (req, res) => {
  res.redirect("/english");
});

app.get("/:language", (req, res, next) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];
  if (!languageCode) {
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: languageCode,
    });
  }
});

// const helloWorld = (view, language) => {
//   return (req, res) => {
//     res.render(view, {
//       countries: COUNTRY_DATA,
//       currentPath: req.path,
//       language: language,
//     });
//   };
// };


// app.get("/english", helloWorld("hello-world-english", "en-US"));
// app.get("/french", helloWorld("hello-world-french", "fr-FR"));
// app.get("/serbian", helloWorld("hello-world-serbian", "sr-Cyrl-rs"));

// app.get('/', (req, res) => {
//   // res.send("Hello World!\n");
//   // res.render("hello-world-english");
//   res.redirect("/english");
// });

// app.get("/english", (req, res) => {
//   res.render("hello-world-english", {
//     // currentLinkIsEnglish: "current",
//     countries: COUNTRY_DATA,
//     currentPath: req.path,
//     language: "en-US",
//   });
//   // writeLog(req, res);
// });

// app.get("/french", (req, res) => {
//   res.render("hello-world-french", {
//     // currentLinkIsFrench: "current",
//     countries: COUNTRY_DATA,
//     currentPath: req.path,
//     language: "fr-FR",
//   });
//   // writeLog(req, res);
// });

// app.get("/serbian", (req, res) => {
//   res.render("hello-world-serbian", {
//     // currentLinkIsSerbian: "current",
//     countries: COUNTRY_DATA,
//     currentPath: req.path,
//     language: "sr-Cyrl-rs",
//   });
//   // writeLog(req, res);
// });

app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(3000, "localhost", () => {
  console.log("Listening on port 3000.");
});
