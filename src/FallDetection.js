

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FallDetection = () => {
//   const [fallDetected, setFallDetected] = useState(false);
//   const [isAlarmOn, setIsAlarmOn] = useState(false);
//   const [location, setLocation] = useState(null); // State for storing the location

//   useEffect(() => {
//     // Check if DeviceMotionEvent is supported
//     if (window.DeviceMotionEvent) {
//       window.addEventListener("devicemotion", handleMotion);
//     } else {
//       console.error("DeviceMotionEvent not supported");
//     }

//     return () => {
//       // Remove event listener when component unmounts
//       window.removeEventListener("devicemotion", handleMotion);
//     };
//   }, []);

//   // Get the current location (latitude, longitude)
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // Handle device motion event and detect fall
//   const handleMotion = (event) => {
//     const acceleration = event.accelerationIncludingGravity;
//     console.log(acceleration); // Log acceleration for debugging

//     // Fall detection threshold: adjust this if needed
//     if (acceleration.z > +1) {
//       setFallDetected(true);
//       setIsAlarmOn(true);
//       getLocation(); // Get location when fall is detected
//       sendEmergencyNotification();
//       playAlarm();
//     }
//   };

//   // Send emergency notification to backend (Twilio will send SMS)
//   const sendEmergencyNotification = async () => {
//     if (location) {
//       // Prepare the message with location
//       const message = `Help me in emergency! My phone fell down. Location: Latitude ${location.latitude}, Longitude ${location.longitude}`;

//       try {
//         await axios.post("http://localhost:5000/send-alert", {
//           message: message, // Send the message with location
//         });
//       } catch (error) {
//         console.error("Error sending alert:", error);
//       }
//     }
//   };

//   // Play alarm sound when fall is detected
//   const playAlarm = () => {
//     const alarm = new Audio("/alarm.mp3"); // Ensure this file exists in your public folder
//     alarm.loop = true;
//     alarm.play();
//   };

//   // Stop the alarm if the user enters the correct password
//   const stopAlarm = () => {
//     const password = prompt("Enter Password to Stop Alarm:");
//     if (password === "1234") {
//       setIsAlarmOn(false);
//       setFallDetected(false);
//     } else {
//       alert("Incorrect Password!");
//     }
//   };

//   return (
//     <div>
//       <h2>Fall Detection</h2>
//       {fallDetected && (
//         <div>
//           <p>Emergency Alert Sent!</p>
//           {isAlarmOn && <button onClick={stopAlarm}>Stop Alarm</button>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FallDetection;


///////////////////////////////////////////////////////////////////////



