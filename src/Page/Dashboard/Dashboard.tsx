import { Menu,  Layout} from "antd";
import {UserOutlined,ProductFilled} from '@ant-design/icons'; 


const {Sider} = Layout; 
function Dashboard(){
    return <>
      {/* <Menu defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']} mode="vertical" items={items}></Menu> */}
      <Sider
      breakpoint="lg"
      collapsedWidth={0}
      style={{ height: '100vh', position: 'fixed', left: 0 , backgroundColor: "#e3e3e3"}}
    >
      <div className=" text-black text-center py-4 text-2xl font-bold">
        OUTFIT
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{backgroundColor: "transparent"}}>
        <Menu.Item key="1" icon={<UserOutlined />} style={{color: "black"}}>
          Users
        </Menu.Item>
        <Menu.Item key="2" icon={<ProductFilled />} style={{color: "black"}} >
          ProductList
        </Menu.Item>
      </Menu>
    </Sider>
    </>
}

export default Dashboard;