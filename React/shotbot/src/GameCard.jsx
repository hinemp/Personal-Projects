import React from "react"
import { Card } from "react-bootstrap";

const GameCard = ({ game }) => {
    return (
      <Card
        className="bg-dark text-white" 
        style={{ width: '350px', margin: '1% auto', color: 'black'}}>
        <Card.Body>
          <Card.Title>
            {game.record} {game.map}
          </Card.Title>
          <Card.Img src={game.agent_img}></Card.Img>
          <Card.Text >
            {game.kills} / {game.deaths}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}

export default GameCard;