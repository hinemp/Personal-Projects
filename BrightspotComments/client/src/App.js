import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./App.css";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { getComments } from "./services/comments";

function App() {
  const [allComments, setAllComments] = useState([]);
  const [commentCount, setCommentCount] = useState(allComments.length);
  const commentsByParentId = useMemo(() => {
    const group = {};
    allComments.forEach((comment) => {
      group[comment.parent_id] ||= [];
      group[comment.parent_id].push(comment);
    });
    return group;
  }, [allComments]);

  useEffect(() => {
    getComments().then((res) => {
      if (res != null) {
        setAllComments(res);
      }
    });
  }, [commentCount]);

  return (
    <div className="App">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Valorant News</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <h3 className="comments-title">Comment Section</h3>
        <CommentForm setCommentCount={setCommentCount}></CommentForm>
        {allComments != null && allComments.length > 0 && (
          <CommentList
            comments={commentsByParentId[null]}
            relation={commentsByParentId}
          />
        )}
      </main>
      {/* Design the article as a separate entity from the comment section for simplicity */}
    </div>
  );
}

export default App;
