import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  query,
  where,
  collection,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styled from 'styled-components';
import { generateDate, generateHour } from '../../utils/convertTime';
import getMenuItem from '../../utils/getMenuItem';
import { PageContainer, SectionContainer, DeliveryTrucker } from './../index';

type ShoppingCartItem = {
  productID: number;
  quantity: number;
};

type Order = {
  products: Array<ShoppingCartItem>;
  customerID: string;
  deliveryAddress: string;
  date: Timestamp;
  status: string;
  orderID: string;
  price: number;
};

const Container = styled.div`
  width: 864px;
  margin: 128px 0;

  @media (max-width: 864px) {
    width: 100%;
    margin: 16px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 864px) {
    display: none;
  }

  th {
    background-color: ${(props) => props.theme.colors.neutral[900]};
    color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    padding: 16px 0 16px 0;
    text-align: left;
    padding: 0 12px;

    &:first-child {
      padding: 16px 12px 16px 24px;
      border-radius: 10px 0 0 0;
    }

    &:last-child {
      padding: 16px 24px 16px 12px;
      border-radius: 0 10px 0 0;
    }
  }

  td {
    padding: 10px;
  }

  th:first-child {
    text-align: left;
  }

  tr td:first-child {
    text-align: left;
  }

  tbody td {
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[900]};
    text-align: left;
    vertical-align: top;
    padding: 16px 12px;

    &:first-child {
      padding: 16px 16px 12px 24px;
    }

    &:last-child {
      padding: 16px 24px 16px 12px;
    }
  }

  table {
    width: 100%;
  }

  div.date {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    flex: 1;
  }

  tbody.items {
    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      padding: 2px 0;
    }
  }
`;
const QuantityContainer = styled.div`
  background-color: ${(props) => props.theme.colors.neutral[100]};
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableMobile = styled.div`
  display: flex;
  flex-direction: column;
  display: none;

  @media (max-width: 864px) {
    display: initial;
  }

  div {
    border-bottom: ${(props) => props.theme.colors.neutral[200]};
    padding: 24px;
  }
`;

const Empty = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize['lg']};
  font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
  text-align: center;
`;

const Orders = () => {
  const { uid } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<Order> | null>(null);

  useEffect(() => {
    const getOrders = (user: string | null) => {
      try {
        const collectionRef = collection(db, 'orders');
        const q = query(collectionRef, where('customerID', '==', user));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const orders = querySnapshot.docs.map((doc) => ({
            products: doc.data().products,
            customerID: doc.data().customerID,
            deliveryAddress: doc.data().deliveryAddress,
            date: doc.data().date,
            status: doc.data().status,
            orderID: doc.id,
            price: doc.data().price,
          }));
          setOrders(orders);
        });

        return () => unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    getOrders(uid);
  }, [uid]);

  return (
    <Container>
      <PageContainer title="Orders">
        {orders && orders.some((order) => order.status !== 'completed') && (
          <SectionContainer title="Delivery trucker">
            {orders.map(
              (order) =>
                order.status !== 'completed' && (
                  <DeliveryTrucker key={order.orderID} order={order} />
                )
            )}
          </SectionContainer>
        )}

        <SectionContainer title="Transaction history">
          <Table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(
                  (order) =>
                    order.status === 'completed' && (
                      <tr key={order.orderID}>
                        <td>{order.orderID}</td>
                        <td>
                          <div className="date">
                            <p>{generateDate(order.date.toDate())}</p>
                            <p>{generateHour(order.date.toDate())}</p>
                          </div>
                        </td>
                        <td>
                          <table>
                            <tbody className="items">
                              {order.products.map((item) => (
                                <tr key={item.productID}>
                                  <td>
                                    <p>{getMenuItem(item.productID)?.name}</p>{' '}
                                    <QuantityContainer>
                                      {item.quantity}
                                    </QuantityContainer>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td>
                          {order.price}
                          {'\u20AC'}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </Table>
          <TableMobile>
            {orders &&
              orders.map(
                (order) =>
                  order.status === 'completed' && (
                    <div key={order.orderID}>
                      <h4># {order.orderID}</h4>
                      <p>
                        Date:{generateDate(order.date.toDate())}
                        {generateHour(order.date.toDate())}
                      </p>
                      <p>Products:</p>
                      {order.products.map((item) => (
                        <div>
                          <p>{getMenuItem(item.productID)?.name}</p>{' '}
                          <div>{item.quantity}</div>
                        </div>
                      ))}
                      <p>
                        Total price: {order.price}
                        {'\u20AC'}{' '}
                      </p>
                    </div>
                  )
              )}
          </TableMobile>
          {(!orders ||
            orders.length === 0 ||
            (orders.length === 1 && orders[0].status !== 'completed')) && (
            <Empty>Your transaction history is empty</Empty>
          )}
        </SectionContainer>
      </PageContainer>
    </Container>
  );
};

export default Orders;
