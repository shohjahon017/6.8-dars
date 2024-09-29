import React, { useEffect, useState, useRef } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
      method: "GET",
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleAddProduct(event) {
    event.preventDefault();

    const newProduct = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts((prod) => [...prod, data]);
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        priceRef.current.value = "";
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <h1 className=" justify-center flex mb-2 mx-auto">Mahsulotlar</h1>
      <form
        onSubmit={handleAddProduct}
        className="mb-4 mx-auto flex flex-col w-1/3 gap-2"
      >
        <input
          ref={nameRef}
          type="text"
          placeholder="Mahsulot nomi"
          className="border rounded-md p-2"
        />
        <input
          ref={descriptionRef}
          type="text"
          placeholder="Mahsulot ta'rifi"
          className="border rounded-md p-2"
        />
        <input
          ref={priceRef}
          type="number"
          placeholder="Mahsulot narxi"
          className="border rounded-md p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
          ADD
        </button>
      </form>

      <ul className="ml-5">
        {products.length > 0 &&
          products.map((product) => (
            <li
              key={product.id}
              className="container border p-5 rounded-md mb-3 hover:scale-[1.01] transition-all"
            >
              <h3>{product.name}</h3>
              <h4> {product.price} so`m</h4> <p>{product.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
