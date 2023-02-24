import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";

const hide = {
  maxHeight: 0,
  transition: "1000ms ease-in",
};

const show = {
  maxHeight: "150px",
  transition: "1000ms ease-out",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`orders?page=${page}`);

      setOrders(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const select = (id: number) => {
    setSelected(selected === id ? 0 : id);
  };

  const handleExport = async () => {
    const { data } = await axios.post(
      "export",
      {},
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <a
          href="#"
          className="btn btn-sm btn-outline-secondary"
          onClick={handleExport}
        >
          Export
        </a>
      </div>
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => {
              return (
                <>
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => select(order.id)}
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="overflow-hidden"
                        style={selected === order.id ? show : hide}
                      >
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product Title</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_items.map((orderItem: OrderItem) => {
                              return (
                                <tr>
                                  <td>{orderItem.id}</td>
                                  <td>{orderItem.product_title}</td>
                                  <td>{orderItem.quantity}</td>
                                  <td>{orderItem.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Paginator
        page={page}
        lastPage={lastPage}
        pageChanged={(page) => setPage(page)}
      ></Paginator>
    </Wrapper>
  );
};

export default Orders;
