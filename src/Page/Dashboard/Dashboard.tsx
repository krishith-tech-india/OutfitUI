import { Menu, Layout } from "antd";
import { UserOutlined, ProductFilled, FileImageFilled } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const { Sider } = Layout;
function Dashboard() {
  const location = useLocation();

  const getMenukey = () => {
    if (location.pathname.includes("/dashboard/users")) {
      return "1";
    }
    if (location.pathname.includes("/dashboard/imagetype")) {
      return "2";
    }
    if (location.pathname.includes("/dashboard/products")) {
      return "3";
    }
    return "1";
  };
  return (
    <>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth={0} style={{ backgroundColor: "#e3e3e3", height: "100vh" }}>
          <div className=" text-black text-center py-4 text-2xl font-bold">OUTFIT</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "transparent" }}
            selectedKeys={[getMenukey()]}
          >
            <Menu.Item key="1" icon={<UserOutlined />} style={{ color: "black" }}>
              <Link to="/dashboard/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileImageFilled />} style={{ color: "black" }}>
              <Link to="/dashboard/imagetype">ImageType</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ProductFilled />} style={{ color: "black" }}>
              <Link to="/dashboard/product">Product List</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content>
            <div>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;

//1. Create user component => user
//2. Fetch data from api on load
