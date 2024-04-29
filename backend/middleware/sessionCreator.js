const store = require("../utils/sessionStore");

module.exports.defaultSession = (req, res, next) => {
  const sessionKey = `user-session:${req.ip}`;

  store.get(sessionKey, (err, sessionData) => {
    if (err) {
      console.error("Error fetching session from the database:", err);
      return next();
    }

    if (!sessionData) {
      // If session doesn't exist, create a new session
      req.session.an_name = generateRandomName(); // Function to generate random name
      req.session.an_pass = generateRandomPassword(); // Function to generate random password

      // Save the new session to the database with the user's IP address as the key
      store.set(sessionKey, req.session, (err) => {
        if (err) {
          console.error("Error saving session to the database:", err);
        }
        setHttpOnlyCookies(res, req.session.an_name, req.session.an_pass);
        next();
      });
    } else {
      // If session exists, set the current session data to the same data as that session
      store.set(sessionKey, req.session);
      setHttpOnlyCookies(res, req.session.an_name, req.session.an_pass);
      next();
    }
  });
};

// Helper function to set HTTP-only cookies
const setHttpOnlyCookies = (res, name, pass) => {
  res.cookie("an_name", name, { httpOnly: false });
  res.cookie("an_pass", pass, { httpOnly: false });
};

// Helper function to generate random name and password
const generateRandomName = () => {
  // Implement logic to generate a random name
  return "random_name"; // Replace with the actual random name
};

const generateRandomPassword = () => {
  // Implement logic to generate a random password
  return "random_password"; // Replace with the actual random password
};
