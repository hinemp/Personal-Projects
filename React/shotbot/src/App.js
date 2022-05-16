import './App.css';
import GameCard from "./GameCard"

import { useState } from 'react';

import { Container, Row, Col, Form, FloatingLabel, Button, Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const API_URL = 'https://api.henrikdev.xyz/valorant/v3/matches/na/'

const getLastFive = async (username, tag) => {
  const response = await fetch(`${API_URL}${username}/${tag}?filter=competitive`);
  const data = await response.json();
  // Data is now the games object like from the discord bot
  let games = [];
  for (let i = 0; i < 5; i++) {
    let game_data = data.data[i]
    let user_stats = game_data.players.all_players.find(({ name }) => name == username).stats;  // Pull all player info
    let agent = game_data.players.all_players.find(({ name }) => name == username).character;
    let agent_img = game_data.players.all_players.find(({ name }) => name == username).assets.agent.full;
    let team_name = game_data.players.all_players.find(({ name }) => name == username).team;   // Get user team name
    let user_team;
    team_name == 'Blue' ? (user_team = game_data.teams.blue) : (user_team = game_data.teams.red);
    let record;
    if (user_team.rounds_won > user_team.rounds_lost) {
      record = `W (${user_team.rounds_won}-${user_team.rounds_lost})`;
    } else if (user_team.rounds_won < user_team.rounds_lost) {
      record = `L (${user_team.rounds_won}-${user_team.rounds_lost})`;
    } else {
      record = `D (${user_team.rounds_won}-${user_team.rounds_lost})`;
    }
    games.push({
      key: i,
      agent: agent,
      agent_img: agent_img,
      kills: user_stats.kills,
      deaths: user_stats.deaths,
      map: game_data.metadata.map,
      record: record
    });
  }
  return games;
}

function App() {
  // State should contain username, tag, last five game lookup
  const [username, setUsername] = useState('');
  const [tag, setTag] = useState('');
  const [games, setGames] = useState([]);

    const submit = async (e) => {
      e.preventDefault();
      let games = await getLastFive(username, tag);
      setGames(games);
    }

    return (
      <div className='App'>
        <header className='App-header'>
          <Container>
            <h1>ShotBot</h1>
            <br />
            <Form onSubmit={submit}>
              <Form.Group as={Row} className="mb-3">
                <Col sm="6">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
                <Col sm='3'>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="tag"
                    onChange={(e) => setTag(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button type='submit' size='lg'>Submit</Button>
                </Col>
              </Form.Group>
            </Form>
            {
              games?.length > 0
                ? (
                  <Row>
                    {games.map((game) => (
                      <GameCard key={game.key} game={game}/>
                    ))}
                  </Row>
                ) : (
                  <h2>Waiting for Games</h2>
                )
            }
          </Container>
        </header>
      </div>
    );
  }

  export default App;
