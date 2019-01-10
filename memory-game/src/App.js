import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Title from "./components/Title";
import Score from "./components/Score";
import characters from "./characters.json";


class App extends Component {
  // Setting this.state.characters to the characters json array
  state = {
    characters,
    score: 0,
    highScore: 0
  };

  componentDidMount(){
    this.setState({
      characters: this.shuffle(this.state.characters)
    });
  }
  
  //Logic for shuffling the cards
  shuffle = characters => {
    let i = characters.length -1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i +1));
      const placeholder = characters[i];
      characters[i] = characters[j];
      characters[j] = placeholder;
      i--;
    }
    return characters;
  };

  correctChoiceLogic = newCharacters => {
    const {highScore, score } = this.state;
    const newScore = score +1;
    const newHighScore = Math.max(newScore, highScore);

    this.setState({
        characters: this.shuffle(newCharacters),
        score: newScore,
        highScore: newHighScore
    });
};

incorrectChoiceLogic = characters => {
  this.setState({
      characters: this.resetCharacters(characters),
      score: 0
  });
};

resetCharacters = characters => {
  const resetCharacters = characters.map(image => ({ ...image, clicked: false}))
  return this.shuffle(resetCharacters);
};

imageClickEvent = (id) => {
  let correct = false;
  const newCharacters = this.state.characters.map(image => {
      const newImage = { ...image };
      if (newImage.id === id) {
          if (!newImage.clicked) {
              newImage.clicked = true;
              correct = true;
          }
      }
      return newImage;
  })
  correct
  ? this.correctChoiceLogic(newCharacters)
  : this.incorrectChoiceLogic(newCharacters);
};


  // Map over this.state.characters and render a CharacterCard component for each character object
  render() {
    return (
      <Wrapper>
        <Grid>
          <Row>
            <Col md={12}>
              <Title>Super Smash Bros. Memory</Title>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Score score={this.state.score} highScore={this.state.highScore}>
              </Score>
            </Col>
          </Row>
          <Row>
            {this.state.characters.map(character => (
              <Col xs={6} md={3}>
                <CharacterCard
                  imageClickEvent={this.imageClickEvent}
                  id={character.id}
                  key={character.id}
                  name={character.name}
                  image={character.image}
                  clicked={character.clicked}
                />
              </Col>
              ))}
          </Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default App;

