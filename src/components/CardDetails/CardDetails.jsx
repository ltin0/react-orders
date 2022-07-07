import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './CardDetails.module.scss';
import { toCurrency } from '../../core/number';

import { Container } from '../Container/Container';

export function CardDetails() {
  const params = useParams();
  const history = useHistory();

  const handleBackAct = () => {
    history.goBack();
  };
  const [orders, GetOrders] = useState({});
  const [fetching, setFetching] = useState(true);

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
        console.log(data);
        setFetching(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {!fetching && (
        <Container>
          <>
            <div className={classes.head}>
              <h1>Olá, {orders.name}</h1>
              <button onClick={handleBackAct}>Sair</button>
            </div>
            <h2>Número do pedido: {orders.id}</h2>

            <p>Resumo da compra</p>
            <hr></hr>

            {/* <h2>address </h2>
          <h2>address {orders.items[0].name}</h2> */}
            {orders.items.map(item => {
              return (
                <>
                  <div className={classes.card}>
                    <h2>{item.qty}x </h2>
                    <h2>{item.name}</h2>
                    <h2>{toCurrency(item.price)}</h2>
                  </div>
                  <hr></hr>
                </>
              );
            })}
            <div className={classes.wraptotal}>
              <div className={classes.total}>
                <p>Prazo de entrega </p>
                <p>Frete </p>
                <h3>Total :</h3>
              </div>
              <div className={classes.total2}>
                <p>
                  de {orders.freight?.from} a {orders.freight?.to} dias
                </p>
                <p>{toCurrency(orders.freight?.price)}</p>
                <h3>{toCurrency(orders.total)}</h3>
              </div>
            </div>
            <hr></hr>
            <div className={classes.freight}>
              <h2>Acompanhe seu pedido</h2>
              <ul>
                <li>{orders.status}</li>
              </ul>
              <div className={classes.end}>
                <h3>Entregar em :</h3>
                <span>{orders.address?.street} ,</span>
                <span> {orders.address?.number}</span>
                <br></br>
                <span> {orders.address?.city} -</span>
                <span> {orders.address?.state}</span>
                <span> {orders.address?.postcode}</span>
              </div>
            </div>
            <div className={classes.payment}>
              <h3>Forma de pagamento </h3>
              <p>{orders.payment_method}</p>
            </div>
          </>
        </Container>
      )}
    </>
  );
}
