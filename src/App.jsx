// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const App = () => {
// //   const [pressCount, setPressCount] = useState(0);
// //   const [location, setLocation] = useState(null);

// //   // Fetch location when Ctrl + Alt + V is pressed or when a fall is detected
// //   const getLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude } = position.coords;
// //           setLocation({ latitude, longitude });
// //         },
// //         (error) => {
// //           console.error("Error getting location:", error);
// //         }
// //       );
// //     } else {
// //       alert("Geolocation is not supported by this browser.");
// //     }
// //   };

// //   // Detect "Ctrl + Alt + V" key press
// //   useEffect(() => {
// //     const handleKeyPress = (event) => {
// //       // Detect "Ctrl + Alt + V" as a trigger
// //       if (event.ctrlKey && event.altKey && event.key === "v") {
// //         setPressCount((prev) => prev + 1);

// //         setTimeout(() => setPressCount(0), 2000); // Reset counter after 2 seconds
// //       }
// //     };

// //     window.addEventListener("keydown", handleKeyPress);

// //     return () => {
// //       window.removeEventListener("keydown", handleKeyPress);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (pressCount === 3) {
// //       // Trigger emergency alert on 3rd press
// //       getLocation(); // Fetch location before sending the alert
// //       sendEmergencyAlert();
// //       setPressCount(0); // Reset the counter after sending the alert
// //     }
// //   }, [pressCount]);

// //   const sendEmergencyAlert = async () => {
// //     if (location) {
// //       const message = `Help me in emergency! I need help. Location: Latitude ${location.latitude}, Longitude ${location.longitude}`;
      
// //       try {
// //         await axios.post("http://localhost:5000/send-alert", {
// //           message: message, // Send the message with location
// //         });
// //         alert("🚨 Emergency Alert Sent!"); // Optional alert for the user
// //       } catch (error) {
// //         console.error("Error sending alert:", error);
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Women Safety App</h1>
// //       <p>Press **Ctrl + Alt + V** three times to send an emergency alert.</p>
// //     </div>
// //   );
// // };

// // export default App;


// /////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [pressTimes, setPressTimes] = useState([]);

//   useEffect(() => {
//     let lastKeyUp = 0; // Track last key release

//     const handleKeyDown = (event) => {
//       if (event.key === "Control") {
//         const now = Date.now();
//         if (now - lastKeyUp > 50) { // Avoid duplicate counts from holding key
//           setPressTimes((prevTimes) => {
//             const newTimes = [...prevTimes, now].filter((t) => now - t < 3000);

//             if (newTimes.length === 3) {
//               sendEmergencyAlert();
//               return []; // Reset count
//             }
//             return newTimes;
//           });
//         }
//       }
//     };

//     const handleKeyUp = (event) => {
//       if (event.key === "Control") {
//         lastKeyUp = Date.now(); // Update last release time
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   const sendEmergencyAlert = async () => {
//     try {
//       await axios.post("http://localhost:5000/send-alert", {
//         message: "🚨 Emergency! I need help!",
//         contact: "+918779489057", // Replace with actual emergency contact
//       });
//       alert("🚨 Emergency Alert Sent!");
//     } catch (error) {
//       console.error("Error sending alert:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Women Safety App</h1>
//       <p>Press the "Ctrl" key 3 times within 3 seconds to send an emergency alert.</p>
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [pressTimes, setPressTimes] = useState([]);

  useEffect(() => {
    let lastKeyUp = 0; // Track last key release

    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        const now = Date.now();
        if (now - lastKeyUp > 50) { // Avoid duplicate counts from holding key
          setPressTimes((prevTimes) => {
            const newTimes = [...prevTimes, now].filter((t) => now - t < 3000);

            if (newTimes.length === 3) {
              sendEmergencyAlert();
              return []; // Reset count
            }
            return newTimes;
          });
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        lastKeyUp = Date.now(); // Update last release time
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const sendEmergencyAlert = async () => {
    try {
      // Get the user's location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Create a Google Maps link for the user's location
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Prepare the emergency message with the Google Maps link
        const message = `🚨 Emergency! I need help! \nLocation: ${mapLink}`;

        // Send the alert with the message and contact number
        await axios.post("http://localhost:5000/send-alert", {
          message: message,
          contact: "+918779489057", // Replace with actual emergency contact
        });

        alert("🚨 Emergency Alert Sent!");
      }, (error) => {
        console.error("Error getting location:", error);
        alert("Couldn't retrieve location. Emergency alert sent without location.");
      });
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  return (
    <div>
      <h1>Women Safety App</h1>
      <p>Press the "Ctrl" key 3 times within 3 seconds to send an emergency alert.</p>
    </div>
  );
};

export default App;
