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
      <div className="flex justify-center items-center mt-50">
        <p>No Data Available to Show!!!!</p>
      </div>
    </>
  );
}

export default ProductList;
