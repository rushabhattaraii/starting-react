import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from '@mui/material/Button';

import "./App.css";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english} </td>
    <td>{pokemon.type.join(",")}</td>
    <td>
      <Button 
      variant ="contained"
      color="primary"
      onClick={() => onSelect(pokemon)}>Select!</Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
  }),
};

const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: lrem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
      .then((res) => res.json())
      .then((pokemon) => this.setState({ pokemon }));
  }

componentDidMount(){
  fetch("http://localhost:3000/starting-react/pokemon.json" )
  .then((resp)=> resp.json())
  .then((pokemon)=> this.setState({
    ... this.state, 
    pokemon,
  }));
 
}

  render() {
    return (
      <Container>
        <Title>Pokemon search</Title>

        <TwoColumnLayout>
          <div>
            <Input
              value={this.state.filter}
              onChange={(evt) => this.setState({ filter: evt.target.value })}
            />
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onSelect={(pokemon) =>
                        this.setState({ selectedItem: pokemon })
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {this.state.selectedItem && <PokemonInfo {...this.state.selectedItem} />}
        </TwoColumnLayout>
      </Container>
    );
  }
}

export default App;