import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button, Modal } from "react-bootstrap";
import { postPublic } from "../../services/apiService";
import Alert from "../../services/alertService";

export const ImgModal = ({ show, onClose, img, updateData, user }) => {
  const editor = useRef(null);
  const [scale, setScale] = useState(1.2);

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  }

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
          borderRadius={500}
          scale={scale}
          //showGrid={true}
        />
        <input type="range" min="1" max="3" step="0.1" value={scale} onChange={handleScaleChange} className="mt-2"/>
        <Button className="btn-quark mt-2" onClick={guardarCambios}>
          Guardar Cambios
        </Button>
      </Modal.Body>
    </Modal>
  );
};
