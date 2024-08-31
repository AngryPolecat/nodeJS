import { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherContainer = ({ className }) => {
  const [city, setCity] = useState('Moscow');
  const [temp, setTemp] = useState(35);
  const [weather, setWeather] = useState('Very hot');

  const date = new Date();

  useEffect(() => {
    setCity('Kemerovo');
    setTemp(30);
    setWeather('Hot');
  }, []);

  return (
    <div className={className}>
      <div>
        {city},{date.toLocaleString('ru', { day: 'numeric', month: 'long' })}
      </div>
      <div>
        {temp} градусов, {weather}
      </div>
    </div>
  );
};

const Weather = styled(WeatherContainer)`
  margin-top: 15px;
`;

const DescriptionContainer = ({ className }) => (
  <div className={className}>
    Блог web-разработчика
    <br />
    web@developer.ru
  </div>
);

const Description = styled(DescriptionContainer)`
  margin-top: 15px;
`;

const FooterContainer = ({ className }) => {
  return (
    <div className={className}>
      <Description />
      <Weather />
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  box-shadow: 0px 0px 10px #000;
`;
