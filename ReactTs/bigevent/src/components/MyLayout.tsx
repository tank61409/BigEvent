import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MyHeader from "./MyHeader";

const { Content } = Layout

function MyLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MyHeader/>
            <Content style={{padding:24}}>
                <Outlet/>
            </Content>
        </Layout>
    )
}
export default MyLayout