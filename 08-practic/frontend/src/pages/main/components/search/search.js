import { Input, Icon } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChangeSearchPhrase }) => {
  return (
    <div className={className}>
      <Input type="text" size="18px" value={searchPhrase} onChange={onChangeSearchPhrase} placeholder="Поиск..." />
      <Icon id="fa-search" margin="0 10px 0 0" size="18px" />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  width: 350px;
  margin: 20px auto 0;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px 0 0 0;
  height: 40px;

  & input {
    width: 100%;
    border: none;
  }

  & input:focus {
    outline: none;
  }
`;

Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  onChangeSearchPhrase: PropTypes.func.isRequired,
};
