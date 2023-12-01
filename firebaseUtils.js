// Importa solo los módulos que necesitas de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  // Tu configuración de Firebase aquí
  apiKey: "AIzaSyBpF6ogTNhRH5msjyuqPV-KoPwK2_yoflU",
  authDomain: "cuyenapp.firebaseapp.com",
  projectId: "cuyenapp",
  storageBucket: "cuyenapp.appspot.com",
  messagingSenderId: "112291740921",
  appId: "1:112291740921:web:070db08fcb17a85d197628",
  measurementId: "G-DL9BSRH945",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(firebaseApp);

// Función para obtener referencia a la base de datos
const getDatabaseReference = (node) => ref(firebaseDB, node);

// Función para realizar una lectura de datos desde Firebase
export const readDataFromFirebase = (node) => {
  const reference = getDatabaseReference(node);

  return get(reference)
    .then((snapshot) => {
      const data = snapshot.val();
      console.log("Datos leídos desde Firebase:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al leer datos desde Firebase:", error);
      throw error;
    });
};

// Función para escribir datos en Firebase
export const writeDataToFirebase = (node, data) => {
  const reference = getDatabaseReference(node);

  return set(reference, data)
    .then(() => {
      console.log("Datos escritos en Firebase correctamente");
    })
    .catch((error) => {
      console.error("Error al escribir datos en Firebase:", error);
      throw error;
    });
};
