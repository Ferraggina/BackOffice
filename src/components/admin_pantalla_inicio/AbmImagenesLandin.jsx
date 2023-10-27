// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLanding,
//   addLanding,
//   updateLanding,
//   deleteLanding,
//   uploadImage,
// } from "../../redux/actions/actions";
// import { Modal, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
// import "../../sass/_abm_Viaje.scss";

// export default function AbmImagenesLandin() {
//   const dispatch = useDispatch();
//   const landingData = useSelector((state) => state.landingData);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     imagen: "",
//     folleto: "",
//     activo: true,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const imageUrl = useSelector((state) => state.imageUrl);

//   console.log("ACA IMAGE URL", imageUrl);
//   useEffect(() => {
//     dispatch(getLanding());
//   }, [dispatch]);
//   // useEffect(() => {
//   //   // Actualiza selectedImages con las imágenes del estado
//   //   setSelectedImages(landingData.map((image) => image.imagen));
//   // }, [landingData]);

//   const handleEditImage = (id) => {
//     const editingImage = landingData.find((image) => image.id === id);
//     setFormData({
//       imagen: editingImage.imagen,
//       folleto: editingImage.folleto,
//       activo: editingImage.activo,
//     });
//     setEditingId(id);
//     setShowModal(true);
//   };

//   const handleSaveEdits = () => {
//     if (editingId) {
//       dispatch(updateLanding(editingId, formData));
//       setEditingId(null);
//       setShowModal(false);
//       alert("Cambios guardados con éxito");
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingId(null);
//   };

//   const handleDeleteImage = (id) => {
//     dispatch(deleteLanding(id));
//   };

//   // const handleImageUpload = async (e) => {
//   //   const selectedImage = e.target.files[0];

//   //   if (selectedImage) {
//   //     const formData = new FormData();
//   //     formData.append("image", selectedImage);
//   //     const response = await dispatch(uploadImage(formData));
//   //     console.log("ACA SELECTED iMAGES", response);
//   //     try {
//   //       if (response) {
//   //         setSelectedImages([...selectedImages, response]);
//   //         console.log("selectedImages después de agregar:", selectedImages);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error al cargar la imagen en el servidor:", error);
//   //     }
//   //   }
//   // };
//   const handleImageUpload = async (e) => {
//     const selectedImage = e.target.files[0];

//     if (selectedImage) {
//       const formData = new FormData();
//       formData.append("image", selectedImage);

//       try {
//         const response = await dispatch(uploadImage(formData));

//         if (response) {
//           setSelectedImages([...selectedImages, response]);
//         }
//       } catch (error) {
//         console.error("Error al cargar la imagen en el servidor:", error);
//       }
//     }
//   };
//   console.log("selectedImages después de agregar:", selectedImages);
//   const removeSelectedImage = (index) => {
//     const newSelectedImages = [...selectedImages];
//     newSelectedImages.splice(index, 1);
//     setSelectedImages(newSelectedImages);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       handleSaveEdits();
//     } else {
//       if (selectedImages.length > 0) {
//         // const imagenes = "[" + selectedImages.join(",") + "]";
//         // const imagenes = `[${selectedImages}]`;
//         const imagenes = JSON.stringify(selectedImages);
//         console.log("IMAGENES DEL ADDLANDING", imagenes);
//         dispatch(
//           addLanding({
//             ...formData,
//             imagen: imagenes,
//           })
//         );

//         setSelectedImages([]);
//         setFormData({
//           imagen: "",
//           folleto: "",
//           activo: true,
//         });

//         setShowModal(false);
//       } else {
//         alert("Debes seleccionar al menos una imagen.");
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center encabezadoLista">
//         Administrar Imágenes de Landing
//       </h2>
//       <div className="search-field d-none d-md-block">
//         <form
//           className="d-flex align-items-center h-100 formularioSearch"
//           action="#"
//         >
//           <div className="input-group">
//             <div className="input-group-prepend bg-transparent">
//               <span className="input-group-text border-0">
//                 <FontAwesomeIcon icon={faSearch} />
//               </span>
//             </div>
//             <input
//               type="search"
//               className="input-md bg-transparent searchabar"
//               placeholder="Buscar Imágenes"
//             />
//           </div>
//         </form>
//       </div>
//       <div className="d-flex justify-content-end mb-3">
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             setFormData({ imagen: "", folleto: "", activo: true });
//             setShowModal(true);
//           }}
//         >
//           <FontAwesomeIcon icon={faPlus} /> Agregar Imagen
//         </button>
//       </div>
//       <ul className="list-unstyled">
//         {landingData.map((image) => (
//           <li key={image.id} className="card mb-4 cardViajes">
//             <div className="card-body">
//               {image.imagen && (
//                 <div>
//                   <p>Imágenes:</p>
//                   <div className="image-list">
//                     {JSON.parse(image.imagen).map((imageUrl, index) => (
//                       <img
//                         key={index}
//                         src={imageUrl}
//                         alt={`Image ${index}`}
//                         className="img-fluid"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <p>{image.activo}</p>

//               <button
//                 className="btn btn-primary botonEditar"
//                 onClick={() => handleEditImage(image.id)}
//               >
//                 Editar
//               </button>
//               <button
//                 className="btn btn-danger botonEliminar"
//                 onClick={() => handleDeleteImage(image.id)}
//               >
//                 Eliminar
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editingId ? "Editar Imagen" : "Crear Imagen"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="mb-3">
//             <p>Seleccionar Imágenes:</p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="mb-3">
//             <p>Seleccionar Folletos:</p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="selected-images">
//             {selectedImages &&
//               selectedImages.map((image, index) => (
//                 <div key={index} className="selected-image-item">
//                   <img
//                     src={image}
//                     alt={`Selected ${index}`}
//                     className="selected-image"
//                   />
//                   <button
//                     className="btn btn-danger remove-image"
//                     onClick={() => removeSelectedImage(index)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               ))}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="btn btn-secondary" onClick={handleCloseModal}>
//             Cerrar
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             {editingId ? "Guardar Cambios" : "Crear Imagen"}
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLanding,
//   addLanding,
//   updateLanding,
//   deleteLanding,
//   uploadImage,
// } from "../../redux/actions/actions";
// import { Modal, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
// import "../../sass/_abm_Viaje.scss";

// export default function AbmImagenesLandin() {
//   const dispatch = useDispatch();
//   const landingData = useSelector((state) => state.landingData);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedFolletos, setSelectedFolletos] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     imagen: "",
//     folleto: "",
//     activo: true,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const imageUrl = useSelector((state) => state.imageUrl);

//   useEffect(() => {
//     dispatch(getLanding());
//   }, [dispatch]);

//   const handleEditImage = (id) => {
//     const editingImage = landingData.find((image) => image.id === id);
//     setFormData({
//       imagen: JSON.stringify(selectedImages),
//       folleto: editingImage.folleto,
//       activo: editingImage.activo,
//     });
//     setEditingId(id);
//     setShowModal(true);
//   };

//   const handleSaveEdits = () => {
//     if (editingId) {
//       dispatch(updateLanding(editingId, formData));
//       setEditingId(null);
//       setShowModal(false);
//       alert("Cambios guardados con éxito");
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingId(null);
//   };

//   const handleDeleteImage = (id) => {
//     dispatch(deleteLanding(id));
//   };

//   const handleImageUpload = async (e) => {
//     const selectedImage = e.target.files[0];

//     if (selectedImage) {
//       const formData = new FormData();
//       formData.append("image", selectedImage);

//       try {
//         const response = await dispatch(uploadImage(formData));

//         if (response) {
//           setSelectedImages([...selectedImages, response]);
//         }
//       } catch (error) {
//         console.error("Error al cargar la imagen en el servidor:", error);
//       }
//     }
//   };

//   const handleFolletoUpload = async (e) => {
//     const selectedFolleto = e.target.files[0];

//     if (selectedFolleto) {
//       const formData = new FormData();
//       formData.append("image", selectedFolleto);

//       try {
//         const response = await dispatch(uploadImage(formData));

//         if (response) {
//           setSelectedFolletos([...selectedFolletos, response]);
//         }
//       } catch (error) {
//         console.error("Error al cargar el folleto en el servidor:", error);
//       }
//     }
//   };

//   const removeSelectedImage = (index) => {
//     const newSelectedImages = [...selectedImages];
//     newSelectedImages.splice(index, 1);
//     setSelectedImages(newSelectedImages);
//   };

//   const removeSelectedFolleto = (index) => {
//     const newSelectedFolletos = [...selectedFolletos];
//     newSelectedFolletos.splice(index, 1);
//     setSelectedFolletos(newSelectedFolletos);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       handleSaveEdits();
//     } else {
//       if (selectedImages.length > 0 && selectedFolletos.length > 0) {
//         const imagenes = JSON.stringify(selectedImages);
//         const folletos = JSON.stringify(selectedFolletos);

//         dispatch(
//           addLanding({
//             ...formData,
//             imagen: imagenes,
//             folleto: folletos,
//           })
//         );

//         setSelectedImages([]);
//         setSelectedFolletos([]);
//         setFormData({
//           imagen: "",
//           folleto: "",
//           activo: true,
//         });

//         setShowModal(false);
//       } else {
//         alert("Debes seleccionar al menos una imagen y un folleto.");
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <br />
//       <br />
//       <br />
//       <div className="d-flex justify-content-end mb-3">
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             setFormData({ imagen: "", folleto: "", activo: true });
//             setShowModal(true);
//           }}
//         >
//           <FontAwesomeIcon icon={faPlus} /> Agregar Imagen
//         </button>
//       </div>
//       <ul className="list-unstyled">
//         {landingData.map((image) => (
//           <li key={image.id} className="card mb-4 cardViajes">
//             <div className="card-body">
//               {image.imagen && (
//                 <div>
//                   <p>Imágenes:</p>
//                   <div className="image-list">
//                     {JSON.parse(image.imagen).map((imageUrl, index) => (
//                       <img
//                         key={index}
//                         src={imageUrl}
//                         alt={`Image ${index}`}
//                         className="img-fluid"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {image.folleto && (
//                 <div>
//                   <p>Folletos:</p>
//                   <div className="folleto-list">
//                     {JSON.parse(image.folleto).map((folletoUrl, index) => (
//                       <img
//                         key={index}
//                         src={folletoUrl}
//                         alt={`Folleto ${index}`}
//                         className="img-fluid"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <p>
//                 {image.activo === "true"
//                   ? "Estado actual: Activado"
//                   : "Estado actual: Desactivado"}
//               </p>

//               <button
//                 className="btn btn-primary botonEditar"
//                 onClick={() => handleEditImage(image.id)}
//               >
//                 Editar
//               </button>
//               <button
//                 className="btn btn-danger botonEliminar"
//                 onClick={() => handleDeleteImage(image.id)}
//               >
//                 Eliminar
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editingId ? "Editar Imagen" : "Crear Imagen"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="mb-3">
//             <p>Seleccionar Imágenes:</p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="mb-3">
//             <p>Seleccionar Folletos:</p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFolletoUpload}
//             />
//           </div>
//           <div className="mb-3">
//             <p>Seleccionar estado:</p>
//             <input
//               type="checkbox"
//               checked={formData.activo}
//               onChange={(e) =>
//                 setFormData({ ...formData, activo: e.target.checked })
//               }
//             />
//           </div>
//           <div className="selected-images">
//             {selectedImages &&
//               selectedImages.map((image, index) => (
//                 <div key={index} className="selected-image-item">
//                   <img
//                     src={image}
//                     alt={`Selected ${index}`}
//                     className="selected-image"
//                   />
//                   <button
//                     className="btn btn-danger remove-image"
//                     onClick={() => removeSelectedImage(index)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               ))}
//           </div>
//           <div className="selected-folletos">
//             {selectedFolletos &&
//               selectedFolletos.map((folleto, index) => (
//                 <div key={index} className="selected-folleto-item">
//                   <img
//                     src={folleto}
//                     alt={`Selected Folleto ${index}`}
//                     className="selected-folleto"
//                   />
//                   <button
//                     className="btn btn-danger remove-folleto"
//                     onClick={() => removeSelectedFolleto(index)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               ))}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="btn btn-secondary" onClick={handleCloseModal}>
//             Cerrar
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             {editingId ? "Guardar Cambios" : "Crear Imagen"}
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getLanding,
//   addLanding,
//   updateLanding,
//   deleteLanding,
//   uploadImage,
// } from "../../redux/actions/actions";
// import { Modal, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
// import "../../sass/_abm_Viaje.scss";

// export default function AbmImagenesLandin() {
//   const dispatch = useDispatch();
//   const landingData = useSelector((state) => state.landingData);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedFolletos, setSelectedFolletos] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     imagen: "",
//     folleto: "",
//     activo: true,
//     posicion: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const imageUrl = useSelector((state) => state.imageUrl);

//   useEffect(() => {
//     dispatch(getLanding());
//   }, [dispatch]);

//   const handleEditImage = (id) => {
//     const editingImage = landingData.find((image) => image.id === id);
//     const existingImages = JSON.parse(editingImage.imagen);
//     const existingFolletos = JSON.parse(editingImage.folleto);

//     setFormData({
//       imagen: "",
//       folleto: "",
//       activo: editingImage.activo,
//     });
//     setSelectedImages(existingImages);
//     setSelectedFolletos(existingFolletos);
//     setEditingId(id);
//     setShowModal(true);
//   };

//   const handleSaveEdits = () => {
//     if (editingId) {
//       dispatch(
//         updateLanding(editingId, {
//           imagen: JSON.stringify(selectedImages),
//           folleto: JSON.stringify(selectedFolletos),
//           activo: formData.activo,
//         })
//       );
//       setEditingId(null);
//       setShowModal(false);
//       alert("Cambios guardados con éxito");
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingId(null);
//   };

//   const handleDeleteImage = (id) => {
//     dispatch(deleteLanding(id));
//   };

//   const handleImageUpload = async (e) => {
//     const selectedImage = e.target.files[0];

//     if (selectedImage) {
//       const formData = new FormData();
//       formData.append("image", selectedImage);

//       try {
//         const response = await dispatch(uploadImage(formData));

//         if (response) {
//           setSelectedImages([...selectedImages, response]);
//         }
//       } catch (error) {
//         console.error("Error al cargar la imagen en el servidor:", error);
//       }
//     }
//   };

//   const handleFolletoUpload = async (e) => {
//     const selectedFolleto = e.target.files[0];

//     if (selectedFolleto) {
//       const formData = new FormData();
//       formData.append("image", selectedFolleto);

//       try {
//         const response = await dispatch(uploadImage(formData));

//         if (response) {
//           setSelectedFolletos([...selectedFolletos, response]);
//         }
//       } catch (error) {
//         console.error("Error al cargar el folleto en el servidor:", error);
//       }
//     }
//   };

//   const removeSelectedImage = (index) => {
//     const newSelectedImages = [...selectedImages];
//     newSelectedImages.splice(index, 1);
//     setSelectedImages(newSelectedImages);
//   };

//   const removeSelectedFolleto = (index) => {
//     const newSelectedFolletos = [...selectedFolletos];
//     newSelectedFolletos.splice(index, 1);
//     setSelectedFolletos(newSelectedFolletos);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       handleSaveEdits();
//     } else {
//       if (selectedImages.length > 0 && selectedFolletos.length > 0) {
//         const imagenes = JSON.stringify(selectedImages);
//         const folletos = JSON.stringify(selectedFolletos);

//         dispatch(
//           addLanding({
//             ...formData,
//             imagen: imagenes,
//             folleto: folletos,
//             activo: formData.activo,
//             posicion: formData.posicion,
//           })
//         );

//         setSelectedImages([]);
//         setSelectedFolletos([]);
//         setFormData({
//           imagen: "",
//           folleto: "",
//           activo: true,
//           posicion: "",
//         });

//         setShowModal(false);
//       } else {
//         alert("Debes seleccionar al menos una imagen y un folleto.");
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <br />
//       <br />
//       <br />
//       <div className="d-flex justify-content-end mb-3">
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             if (editingId) {
//               setEditingId(null);
//             }
//             setFormData({ imagen: "", folleto: "", activo: true });
//             setSelectedImages([]);
//             setSelectedFolletos([]);
//             setShowModal(true);
//           }}
//         >
//           <FontAwesomeIcon icon={faPlus} /> Agregar Imagen
//         </button>
//       </div>
//       <ul className="list-unstyled">
//         {landingData.map((image) => (
//           <li key={image.id} className="card mb-4 cardViajes">
//             <div className="card-body">
//               {image.imagen && (
//                 <div>
//                   <p>Imágenes:</p>
//                   <div className="image-list">
//                     {JSON.parse(image.imagen).map((imageUrl, index) => (
//                       <img
//                         key={index}
//                         src={imageUrl}
//                         alt={`Image ${index}`}
//                         className="img-fluid image-preview"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {image.folleto && (
//                 <div>
//                   <p>Folletos:</p>
//                   <div className="folleto-list">
//                     {JSON.parse(image.folleto).map((folletoUrl, index) => (
//                       <img
//                         key={index}
//                         src={folletoUrl}
//                         alt={`Folleto ${index}`}
//                         className="img-fluid image-preview "
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <p>
//                 {image.activo === "true"
//                   ? "Estado actual: Activado"
//                   : "Estado actual: Desactivado"}
//               </p>

//               <button
//                 className="btn btn-primary botonEditar"
//                 onClick={() => handleEditImage(image.id)}
//               >
//                 Editar
//               </button>
//               <button
//                 className="btn btn-danger botonEliminar"
//                 onClick={() => handleDeleteImage(image.id)}
//               >
//                 Eliminar
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editingId ? "Editar Imagen" : "Crear Imagen"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="mb-3">
//             <p>Seleccionar Imágenes:</p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="mb-3">
//             <p>Seleccionar Folletos:</p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFolletoUpload}
//             />
//           </div>
//           <div className="mb-3">
//             <p>Seleccionar estado:</p>
//             <input
//               type="checkbox"
//               checked={formData.activo}
//               onChange={(e) =>
//                 setFormData({ ...formData, activo: e.target.checked })
//               }
//             />
//           </div>
//           <div className="selected-images">
//             {selectedImages &&
//               selectedImages.map((image, index) => (
//                 <div key={index} className="selected-image-item">
//                   <img
//                     src={image}
//                     alt={`Selected ${index}`}
//                     className="selected-image"
//                   />
//                   <button
//                     className="btn btn-danger remove-image"
//                     onClick={() => removeSelectedImage(index)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               ))}
//           </div>
//           <div className="selected-folletos">
//             {selectedFolletos &&
//               selectedFolletos.map((folleto, index) => (
//                 <div key={index} className="selected-folleto-item">
//                   <img
//                     src={folleto}
//                     alt={`Selected Folleto ${index}`}
//                     className="selected-folleto"
//                   />
//                   <button
//                     className="btn btn-danger remove-folleto"
//                     onClick={() => removeSelectedFolleto(index)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               ))}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="btn btn-secondary" onClick={handleCloseModal}>
//             Cerrar
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             {editingId ? "Guardar Cambios" : "Crear Imagen"}
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanding,
  addLanding,
  updateLanding,
  deleteLanding,
  uploadImage,
} from "../../redux/actions/actions";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../sass/_abm_Viaje.scss";

export default function AbmImagenesLandin() {
  const dispatch = useDispatch();
  const landingData = useSelector((state) => state.landingData);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFolletos, setSelectedFolletos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    imagen: "",
    folleto: "",
    activo: true,
    posicion: "", // Agregamos el campo de posición
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getLanding());
  }, [dispatch]);

  const handleEditImage = (id) => {
    const editingImage = landingData.find((image) => image.id === id);
    const existingImages = JSON.parse(editingImage.imagen);
    const existingFolletos = JSON.parse(editingImage.folleto);

    setFormData({
      imagen: "",
      folleto: "",
      activo: editingImage.activo,
      posicion: editingImage.posicion, // Cargamos la posición
    });
    setSelectedImages(existingImages);
    setSelectedFolletos(existingFolletos);
    setEditingId(id);
    setShowModal(true);
  };

  const handleSaveEdits = () => {
    if (editingId) {
      dispatch(
        updateLanding(editingId, {
          imagen: JSON.stringify(selectedImages),
          folleto: JSON.stringify(selectedFolletos),
          activo: formData.activo,
          posicion: formData.posicion, // Agregamos la posición
        })
      );
      setEditingId(null);
      setShowModal(false);
      alert("Cambios guardados con éxito");
    }
  };

  const handleDeleteImage = (id) => {
    dispatch(deleteLanding(id));
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await dispatch(uploadImage(formData));

        if (response) {
          setSelectedImages([...selectedImages, response]);
        }
      } catch (error) {
        console.error("Error al cargar la imagen en el servidor:", error);
      }
    }
  };

  const handleFolletoUpload = async (e) => {
    const selectedFolleto = e.target.files[0];

    if (selectedFolleto) {
      const formData = new FormData();
      formData.append("image", selectedFolleto);

      try {
        const response = await dispatch(uploadImage(formData));

        if (response) {
          setSelectedFolletos([...selectedFolletos, response]);
        }
      } catch (error) {
        console.error("Error al cargar el folleto en el servidor:", error);
      }
    }
  };

  const removeSelectedImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  const removeSelectedFolleto = (index) => {
    const newSelectedFolletos = [...selectedFolletos];
    newSelectedFolletos.splice(index, 1);
    setSelectedFolletos(newSelectedFolletos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleSaveEdits();
    } else {
      if (selectedImages.length > 0 && selectedFolletos.length > 0) {
        const imagenes = JSON.stringify(selectedImages);
        const folletos = JSON.stringify(selectedFolletos);

        dispatch(
          addLanding({
            ...formData,
            imagen: imagenes,
            folleto: folletos,
            activo: formData.activo,
            posicion: formData.posicion,
          })
        );

        setSelectedImages([]);
        setSelectedFolletos([]);
        setFormData({
          imagen: "",
          folleto: "",
          activo: true,
          posicion: "",
        });

        setShowModal(false);
      } else {
        alert("Debes seleccionar al menos una imagen y un folleto.");
      }
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            if (editingId) {
              setEditingId(null);
            }
            setFormData({ imagen: "", folleto: "", activo: true });
            setSelectedImages([]);
            setSelectedFolletos([]);
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Agregar Imagen
        </button>
      </div>
      <ul className="list-unstyled">
        {landingData.map((image) => (
          <li key={image.id} className="card mb-4 cardViajes">
            <div className="card-body">
              {image.imagen && (
                <div>
                  <p>Imágenes:</p>
                  <div className="image-list">
                    {JSON.parse(image.imagen).map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="img-fluid image-preview"
                      />
                    ))}
                  </div>
                </div>
              )}
              {image.folleto && (
                <div>
                  <p>Folletos:</p>
                  <div className="folleto-list">
                    {JSON.parse(image.folleto).map((folletoUrl, index) => (
                      <img
                        key={index}
                        src={folletoUrl}
                        alt={`Folleto ${index}`}
                        className="img-fluid image-preview"
                      />
                    ))}
                  </div>
                </div>
              )}
              <p>
                {image.activo === "true"
                  ? "Estado actual: Activado"
                  : "Estado actual: Desactivado"}
              </p>
              <p>posicion: {image.posicion}</p>
              <button
                className="btn btn-primary botonEditar"
                onClick={() => handleEditImage(image.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger botonEliminar"
                onClick={() => handleDeleteImage(image.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Editar Imagen" : "Crear Imagen"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <p>Seleccionar Imágenes:</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-3">
            <p>Seleccionar Folletos:</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFolletoUpload}
            />
          </div>
          <div className="mb-3">
            <p>Seleccionar estado:</p>
            <input
              type="checkbox"
              checked={formData.activo}
              onChange={(e) =>
                setFormData({ ...formData, activo: e.target.checked })
              }
            />
          </div>
          <div className="mb-3">
            <p>Posición:</p>
            <input
              type="text"
              placeholder="Posición"
              value={formData.posicion || ""} // Asegúrate de que el valor sea una cadena
              onChange={(e) =>
                setFormData({ ...formData, posicion: e.target.value })
              }
            />
          </div>
          <div className="selected-images">
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index} className="selected-image-item">
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="selected-image"
                  />
                  <button
                    className="btn btn-danger remove-image"
                    onClick={() => removeSelectedImage(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
          </div>
          <div className="selected-folletos">
            {selectedFolletos &&
              selectedFolletos.map((folleto, index) => (
                <div key={index} className="selected-folleto-item">
                  <img
                    src={folleto}
                    alt={`Selected Folleto ${index}`}
                    className="selected-folleto"
                  />
                  <button
                    className="btn btn-danger remove-folleto"
                    onClick={() => removeSelectedFolleto(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editingId ? "Guardar Cambios" : "Crear Imagen"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
