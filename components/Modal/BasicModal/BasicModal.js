import { Modal, Icon } from "semantic-ui-react";

export default function BasicModal(props) {
  const { showModal, setShowModal, title, children, ...rest } = props;

  const onClose = () => setShowModal(false);

  return (
    <div>
      <Modal 
        className="basic-modal" 
        open={showModal} 
        onClose={onClose} 
        {...rest}
        >
        <Modal.Header>
          <span>{title}</span> 
          <Icon name="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Content>
            {children}
        </Modal.Content>
      </Modal>
    </div>
  );
}
