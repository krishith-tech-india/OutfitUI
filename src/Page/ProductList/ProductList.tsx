import { Header } from "antd/es/layout/layout";

function ProductList() {
  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "chocolate",
          backgroundColor: "transparent",
          marginLeft: "-35px",
        }}
      >
        <div className=" text-4xl font-bold ">Product List</div>
      </Header>
    </>
  );
}

export default ProductList;
