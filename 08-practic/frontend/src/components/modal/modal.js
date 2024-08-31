import { useSelector } from 'react-redux';
import { modalIsOpenSelector, modalOnConfirmSelector, modalOnCancelSelector, modalTextSelector } from '../../selectors';
import { Button } from '..';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 21;
`;

const Box = styled.div`
  position: relative;
  margin: auto;
  width: 400px;
  z-index: 30;
  background-color: #fff;
  min-height: 150px;
  top: 50%;
  transform: translate(0, -100%);
  border: 1px solid #fff;
  padding: 10px;
`;

const ModalContainer = ({ className }) => {
  const text = useSelector(modalTextSelector);
  const onConfirm = useSelector(modalOnConfirmSelector);
  const onCancel = useSelector(modalOnCancelSelector);
  const isOpen = useSelector(modalIsOpenSelector);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <Overlay className="overlay"></Overlay>
      <Box className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button onClick={onConfirm}>Да</Button>
          <Button onClick={onCancel}>Отмена</Button>
        </div>
      </Box>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  & h3 {
    text-align: center;
  }

  & .buttons {
    display: flex;
    justify-content: space-evenly;
  }

  & button {
    margin: 10px;
  }
`;
