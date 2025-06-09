import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MyHeader from "./MyHeader";
import MySider from "./MySider";

const { Content } = Layout

function MyLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MySider />
            <Layout>

                <MyHeader />
                <Content style={{ padding: 24 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default MyLayout