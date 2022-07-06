import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container } from '../Container/Container';

export function CardDetails() {
  const params = useParams();
  const history = useHistory();

  const handleBackAct = () => {
    history.goBack();
  };
  const [orders, GetOrders] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/${params.id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        GetOrders(data);

        console.log(data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Container>
        <button onClick={handleBackAct}>Voltar</button>
        <h1>Olá, {orders.name}</h1>
        <h2>Número do pedido {orders.id}</h2>

        <h2>Número do pedido {orders.address.city}</h2>

      </Container>
    </>
  );
}
