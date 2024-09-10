import styled from 'styled-components'

const GroupContainer = ({ className, group: { id, title, url }, ...props }) => {
  return (
    <div className={className} {...props}>
      <div className={!url ? 'no-url-image' : null}>{url ? <img src={url} alt="" /> : null}</div>
      <div className="title-group">{title}</div>
    </div>
  )
}

export const Group = styled(GroupContainer)`
  position: relative;
  width: 300px;
  height: 220px;
  text-align: center;
  border: 0px solid black;
  margin: 10px;
  box-shadow: 0px 0px 10px #405060;
  cursor: pointer;

  & img {
    width: 300px;
    height: 220px;
  }

  & .no-url-image {
    width: 300px;
    height: 220px;
    background-image: url('https://china-motor.ru/img/placeholder.jpg');
    background-repeat: no-repeat;
    background-size: 300px 220px;
  }

  & .title-group {
    position: absolute;
    bottom: 0;
    right: 0px;
    background-color: #405060;
    color: white;
    padding: 5px;
    width: 150px;
    text-align: right;
    border-radius: 5px 0 0 5px;
  }
`
