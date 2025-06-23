import { Button, theme } from "antd";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout

function MyHeader() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const handleClick = () => {
        if (token) {
            localStorage.removeItem('token')
            navigate('/home')
        } else {
            navigate('/login')
        }
    }
    return (
        <Header style={{ display: 'flex', padding: 0, background: colorBgContainer, justifyContent: "flex-end", alignItems: 'center' }}>
            <Button type={token ? 'default' : "primary"} onClick={handleClick}>{token ? '登出' : '登入'}</Button>
        </Header>
    )
}
export default MyHeader