import React from "react"
import { Card } from "react-bootstrap";

const StatsCard = ({ games }) => {
    return (
      <Card
        className="bg-dark text-white" 
        style={{ width: '350px', margin: '1% auto', color: 'black'}}>
        <Card.Body>
          <Card.Title>
            Stats
          </Card.Title>
          <Card.Text >
            {game.kills} / {game.deaths}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}

export default StatsCard;