import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKSMRebFs4bWRQmeOLEGQwAIzc6bHqALk",
  authDomain: "crud-app-3fb99.firebaseapp.com",
  projectId: "crud-app-3fb99",
  storageBucket: "crud-app-3fb99.appspot.com",
  messagingSenderId: "575715276579",
  appId: "1:575715276579:web:20020c1ce19e8543a83e96",
  measurementId: "G-MQ36NYVVPE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const imageToUrl = async (image) => {
  try {
    // Create a reference to the location where you want to store the image
    const storageRef = ref(storage, `images/${image.name}`);

    // Upload the image to Firebase Storage
    const snapshot = await uploadBytes(storageRef, image);

    // Get the URL of the uploaded image
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export { imageToUrl };
