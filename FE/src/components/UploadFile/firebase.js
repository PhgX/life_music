import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



// const firebaseConfig = {
//   apiKey: "AIzaSyAbmf4jVBPCwKluuoK8UcFN8W6jRrfhF4o",
//   authDomain: "life-music-c7829.firebaseapp.com",
//   projectId: "life-music-c7829",
//   storageBucket: "life-music-c7829.appspot.com",
//   messagingSenderId: "745434327413",
//   appId: "1:745434327413:web:03141f157d18f1d2220b3c",
//   measurementId: "G-EFXV48VGWJ"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCSf9zvqJh6N17AzzTDO9dHWCcnnKNdDF0",
  authDomain: "life-music-409c0.firebaseapp.com",
  projectId: "life-music-409c0",
  storageBucket: "life-music-409c0.appspot.com",
  messagingSenderId: "511431376627",
  appId: "1:511431376627:web:3283d3c6bc1a8c39ca4186",
  measurementId: "G-02Z1K0Z0PY"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
