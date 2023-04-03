import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal } from "react-bootstrap";
import { postPublic } from "../../services/apiService";
import Alert from "../../services/alertService";

export const ImgModal = ({ show, onClose, img, updateData, user }) => {
  const editor = useRef(null);

  

  const guardarCambios = async () => {
    const formData = new FormData();

    const canvasScaled = editor.current.getImageScaledToCanvas();
    canvasScaled.toBlob(async (blob) => {
      const archivo = new File([blob], "imagen_recortada.png", {
        type: "image/png",
      });
      console.log(archivo);

      formData.append("file", archivo);
      formData.append("userid", user.id);

      const res = await postPublic(`/userImg/upload`, formData);
        console.log(res);
        Alert.success({ title: "Actualizado!", message: "Imagen actualizada" });
        await updateData();
        onClose()
    }, "image/png");
    if (editor.current) {
      try {
        console.log(formData)
        
      } catch (e) {
        console.log(e);
        Alert.error({ title: "Error!", message: e.response.data.msg });
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <h5>Editar imagen de perfil</h5>
      </Modal.Header>
      <Modal.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <AvatarEditor
          ref={editor}
          image={img}
          width={250}
          height={250}
          border={50}
          borderRadius={8}
          scale={1.2}
          showGrid={true}
        />
        <button className="btn-quark mt-4" onClick={guardarCambios}>
          Guardar Cambios
        </button>
      </Modal.Body>
    </Modal>
  );
};
