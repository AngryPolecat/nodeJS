import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="loader"></div>
    </div>
  );
};

export const Loader = styled(LoaderContainer)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 21;

  & .loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 75px;
    height: 75px;
    border-radius: 100px;
    border-top: 5px solid red;
    border-left: 3px solid brown;
    border-bottom: 1px solid purple;
    border-right: transperent;
    animation: spinner 0.8s linear infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
