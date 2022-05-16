import logo from './logo.svg';
import './App.css';

import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Form>
            <Row>
              <Col md>
                <Form.Group controlId='formEmail'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='example@email.com'></Form.Control>
                  <Form.Text>You probably shouldn't trust this tbh</Form.Text>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='password'></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button variant='secondary' type='submit'>Login</Button>
          </Form>

          <Card className="mb-3" style={{ color: "black" }}>
            <Card.Img src='https://picsum.photos/200/100' />
            <Card.Body>
              <Card.Title>
                Card Example
              </Card.Title>
              <Card.Text>
                This is an example
              </Card.Text>
              <Button variant='primary'>Read More</Button>
            </Card.Body>
          </Card>
          <Breadcrumb>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
          </Breadcrumb>
          <Alert variant='success'>This is a Button</Alert>
          <Button>Test Button</Button>
        </Container>
      </header>
    </div>
  );
}

export default App;
