import React from 'react';
import './App.css';
import Axios from 'axios';
import {Button, Col, Row, Container, Card} from 'react-bootstrap';

const styles = {
  cardcachorro: {
    "width":"20rem",
    "display": "inline-block",
  }
}

const CardCachorro = (props) => (
  <Card style={styles.cardcachorro}>
    <Card.Img variant="top" src={props.img} />
    <Card.Body>
      <Card.Title>{props.nome}</Card.Title>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => props.clonar(props.index)}>Clonar</Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={() => props.atualizar(props.index)}>Atualizar</Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
)


class Cachorro extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cachorros: []
    };

    this.renderizar();
  }

  renderizar = async () => {
    const resposta = await Axios.get('http://localhost:8080/cachorros')
    
    if(resposta.data) {
      this.setState({ cachorros: resposta.data });
    }
  }

  clonar = async (index) => {
    const cachorro = this.state.cachorros[index];
    console.log(cachorro)
    await Axios.post('http://localhost:8080/cachorros', cachorro);
    this.renderizar();
  }

  atualizar = async (index) => {
    const cachorro = this.state.cachorros[index];
    let nome = prompt("Digite um novo nome: ");

    if (nome.trim() !== null) {
      cachorro.nome = nome;
      await Axios.put(`http://localhost:8080/cachorros/${cachorro.id}`, cachorro);
      this.renderizar();
    } 
  }

  render() {
    return (
      <Container>
        {
          this.state.cachorros.map((cachorro, index) => (
            <CardCachorro
                key={index}
                index={index}
                nome={cachorro.nome}
                img={cachorro.imagem}
                atualizar={this.atualizar}
                clonar={this.clonar} {...cachorro}
            />
          ))
        }
      </Container>
    );
  }
}

export default Cachorro;
