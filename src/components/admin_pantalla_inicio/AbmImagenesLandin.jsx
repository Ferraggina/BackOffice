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
import Pagination from "../home/Pagination";
import { reuleaux } from "ldrs";
export default function AbmImagenesLandin() {
  const dispatch = useDispatch();
  const landingData = useSelector((state) => state.landingData);
  const [selectedImages, setSelectedImages] = useState("");
  const [selectedFolletos, setSelectedFolletos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    folleto: "",
    activo: true,
    posicion: "", // Agregamos el campo de posición
  });
  const [editingId, setEditingId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingImage, setViewingImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activatedCount, setActivatedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getLanding());
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 1500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleEditImage = (id) => {
    const editingImage = landingData.find((image) => image.id === id);
    const existingImages = editingImage.image;
    const existingFolletos = JSON.parse(editingImage.folleto);

    setFormData({
      image: existingImages.length > 0 ? existingImages[0] : "", // Tomar la primera URL
      folleto: "",
      activo: editingImage.activo === "true",
      posicion: editingImage.posicion,
    });

    setSelectedImages(existingImages);
    setSelectedFolletos(existingFolletos);
    setEditingId(id);
    setShowModal(true);
  };
  // const handleSaveEdits = () => {
  //   if (editingId) {
  //     dispatch(
  //       updateLanding(editingId, {
  //         image: JSON.stringify(selectedImages),
  //         folleto: JSON.stringify(selectedFolletos),
  //         activo: formData.activo,
  //         posicion: formData.posicion, // Agregamos la posición
  //       })
  //     );
  //     setEditingId(null);
  //     setShowModal(false);
  //     alert("Cambios guardados con éxito");
  //   }
  // };
  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await dispatch(uploadImage(formData));

        if (response) {
          setSelectedImages(response);
        }
      } catch (error) {
        console.error("Error al cargar la imagen en el servidor:", error);
      }
    }
  };

  const handleSaveEdits = () => {
    if (editingId) {
      const firstImageUrl = selectedImages;
      const activatedImagesCount = landingData.filter(
        (image) => image.activo === "true"
      ).length;

      if (activatedImagesCount <= 5 || formData.activo === false) {
        dispatch(
          updateLanding(editingId, {
            image: firstImageUrl,
            folleto: JSON.stringify(selectedFolletos),
            activo: formData.activo,
            posicion: formData.posicion,
          })
        );
        setEditingId(null);
        setShowModal(false);
        alert("Cambios guardados con éxito");
      } else {
        alert("Solo puede tener 5 landings activas");
      }
    }
  };

  const handleDeleteImage = (id) => {
    dispatch(deleteLanding(id));
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

  // const removeSelectedImage = (index) => {
  //   const newSelectedImages = [...selectedImages];
  //   newSelectedImages.splice(index, 1);
  //   setSelectedImages(newSelectedImages);
  // };
  const removeSelectedImage = () => {
    setSelectedImages(""); // O puedes establecerlo en null, dependiendo de tus necesidades
  };

  const removeSelectedFolleto = (index) => {
    const newSelectedFolletos = [...selectedFolletos];
    newSelectedFolletos.splice(index, 1);
    setSelectedFolletos(newSelectedFolletos);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (editingId) {
  //     handleSaveEdits();
  //   } else {
  //     if (selectedImages.length > 0 && selectedFolletos.length > 0) {
  //       const imagenes = JSON.stringify(selectedImages);
  //       const folletos = JSON.stringify(selectedFolletos);

  //       dispatch(
  //         addLanding({
  //           ...formData,
  //           image: imagenes,
  //           folleto: folletos,
  //           activo: formData.activo,
  //           posicion: formData.posicion,
  //         })
  //       );

  //       setSelectedImages([]);
  //       setSelectedFolletos([]);
  //       setFormData({
  //         image: "",
  //         folleto: "",
  //         activo: true,
  //         posicion: "",
  //       });

  //       setShowModal(false);
  //     } else {
  //       alert("Debes seleccionar al menos una imagen y un folleto.");
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleSaveEdits();
    } else {
      const imagenes = selectedImages;
      const folletos = JSON.stringify(selectedFolletos);
      const activatedImagesCount = landingData.filter(
        (image) => image.activo === "true"
      ).length;

      if (activatedImagesCount < 5 || formData.activo === false) {
        dispatch(
          addLanding({
            ...formData,
            image: imagenes,
            folleto: folletos,
            activo: formData.activo,
            posicion: formData.posicion,
          })
        );

        setSelectedImages([]);
        setSelectedFolletos([]);
        setFormData({
          image: "",
          folleto: "",
          activo: true,
          posicion: "",
        });

        setShowModal(false);
      } else {
        alert("Solo puede tener 5 landings activas");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };
  const handleViewClick = (landingData) => {
    setViewingImage(landingData);
    setShowViewModal(true);
  };
  const filterLanding = (landing) => {
    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = landing.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambie la cantidad de elementos por página
  };
  const handleCheckChange = (e) => {
    const isCurrentlyActivated = e.target.checked;

    const activatedImagesCount = landingData.filter(
      (image) => image.activo === "true"
    ).length;

    const willExceedLimit = isCurrentlyActivated && activatedImagesCount >= 5;

    if (willExceedLimit) {
      alert("No se permiten más de 5 landings activas");
      return;
    }

    setFormData({ ...formData, activo: isCurrentlyActivated });

    const updatedActivatedCount = isCurrentlyActivated
      ? activatedImagesCount + 1
      : activatedImagesCount - 1;

    setActivatedCount(updatedActivatedCount);
  };

  return (
    <div className="custom-container mt-8">
      <br />

      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="spinner">
            {/* Contenido del spinner */}

            {reuleaux.register()}
            <l-reuleaux
              size="120"
              stroke="7"
              stroke-length="0.15"
              bg-opacity="0.40"
              speed="1.2"
              color="#244AE0"
            ></l-reuleaux>
          </div>
          <p className="text-center mt-3">Cargando...</p>
        </div>
      ) : (
        <div className="cardViajes">
          <h2 className="text-center encabezadoLista">Imágenes y Folletos</h2>
          <div className="botonCrear ">
            <button
              className="btn btn-primary botonCrearLink"
              onClick={() => {
                if (editingId) {
                  setEditingId(null);
                }
                setFormData({ image: "", folleto: "", activo: true });
                setSelectedImages("");
                setSelectedFolletos([]);
                setShowModal(true);
              }}
              title="Agregar Imagenes"
            >
              <lord-icon
                src="https://cdn.lordicon.com/ftndcppj.json"
                trigger="hover"
                colors="primary:#1b1091,secondary:#e4e4e4"
                style={{ width: "40px", height: "40px" }}
              ></lord-icon>
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered tablaViaje">
              <thead className="text-center cabecerasDeTabla">
                <tr>
                  <th>Imágenes</th>
                  <th>Folletos</th>
                  <th>Estado</th>
                  <th>Posición</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center cuerpoTabla">
                {filterLanding(landingData).map((image) => (
                  <tr key={image.id}>
                    <td>
                      {image.image && (
                        <div className="image-list">
                          <img
                            src={image.image}
                            alt={`${image.image}`}
                            className="img-fluid image-preview"
                            style={{ width: "80px", height: "80px" }}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      {image.folleto && (
                        <div>
                          <div className="folleto-list">
                            {JSON.parse(image.folleto).map(
                              (folletoUrl, index) => (
                                <img
                                  key={index}
                                  src={folletoUrl}
                                  alt={`Folleto ${index}`}
                                  className="img-fluid image-preview"
                                  style={{ width: "80px", height: "80px" }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <h5>
                        {image.activo === "true" ? "Activado" : "Desactivado"}
                      </h5>
                    </td>
                    <td>
                      <h5>{image.posicion}</h5>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary botonEditar"
                        onClick={() => handleEditImage(image.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/zfzufhzk.json"
                          trigger="hover"
                          style={{ width: "15px", height: "15px" }}
                        ></lord-icon>
                      </button>
                      <button
                        className="btn btn-danger botonEliminar"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/xekbkxul.json"
                          trigger="hover"
                          style={{ width: "15px", height: "15px" }}
                        ></lord-icon>
                      </button>
                      <button
                        className="btn btn-info botonEditar"
                        onClick={() => handleViewClick(image)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ascijbjj.json"
                          trigger="hover"
                          style={{ width: "15px", height: "15px" }}
                        ></lord-icon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination  d-flex justify-content-center align-items-center">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={landingData.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de imagenes por pagina:
            </p>
            <form className="d-flex align-items-center h-100 " action="#">
              {/* Resto de tu código */}
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="form-select mx-1 seletItemsViajes"
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </form>
          </div>
        </div>
      )}

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
          {/* <div className="mb-3">
            <p>Seleccionar estado:</p>
            <input
              type="checkbox"
              checked={formData.activo}
              onChange={handleCheckChange}
            />
          </div> */}
          <p className="me-3 seleccionestado">Seleccionar estado:</p>
          <div className="mb-3 d-flex align-items-center">
            <p className="me-5">Desactivado</p>
            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input switchEstado "
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={formData.activo}
                onChange={handleCheckChange}
              />
            </div>
            <p className="me-2 activadoClase">Activado</p>
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
            {selectedImages && typeof selectedImages === "string" && (
              <div className="selected-image-item">
                <h4>Imagen Landing:</h4>
                <img
                  src={selectedImages}
                  alt={`Selected`}
                  className="selected-image"
                  style={{ width: "450px", height: "250px" }}
                />
                <button
                  className="btn btn-danger remove-image"
                  onClick={() => removeSelectedImage(0)}
                >
                  X
                </button>
              </div>
            )}
          </div>
          <div className="selected-folletos">
            {selectedFolletos &&
              selectedFolletos.map((folleto, index) => (
                <div key={index} className="selected-folleto-item">
                  <h4>Folleto:</h4>
                  <img
                    src={folleto}
                    alt={`Selected Folleto ${index}`}
                    className="selected-folleto"
                    style={{ width: "450px", height: "250px" }}
                  />
                  <button
                    className="btn btn-danger remove-folleto"
                    onClick={() => removeSelectedFolleto(index)}
                  >
                    X
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
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {viewingImage && (
              <div>
                <h5>Foto Landing:</h5>
                <div className="text-center">
                  {viewingImage.image ? (
                    <div className="row">
                      <img
                        src={viewingImage.image}
                        alt={`Selected 0`}
                        className="selected-image img-fluid"
                        style={{ width: "450px", height: "250px" }}
                      />
                    </div>
                  ) : (
                    <p>No hay fotos</p>
                  )}
                </div>
              </div>
            )}

            {viewingImage && (
              <div>
                <h5>Folleto:</h5>
                <div className="text-center">
                  {viewingImage.folleto ? (
                    <div className="row">
                      {JSON.parse(viewingImage.folleto).map((foto, index) => (
                        <div key={index}>
                          <img
                            src={foto}
                            alt={`Selected ${index}`}
                            className="selected-image img-fluid"
                            style={{ width: "450px", height: "250px" }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No hay fotos</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
