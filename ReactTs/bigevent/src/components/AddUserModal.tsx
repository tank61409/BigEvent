import { Form, Input, Modal } from "antd";
import axios from "axios";
import { AddUser } from "../interface/userInterface";

interface Props {
    open: boolean;
    onCancel: () => void;
}

function AddUserModal(props: Props) {
    type FieldType = {
        username?: string;
        password?: string;
    };

    const { open, onCancel } = props;
    const [form] = Form.useForm();

    const handleOk = async () => {
        const value: AddUser = await form.validateFields();
        await axios.post("https://bigevent-production.up.railway.app/user/register", value);
        console.log("新增成功")
        onCancel();
    }

    return (
        <Modal open={open} title="新增使用者" okText="送出" cancelText="取消" onOk={handleOk} onCancel={onCancel} destroyOnHidden>
            <Form form={form} layout="vertical" >
                <Form.Item name="username" label="帳號" rules={[{ required: true, message: "請輸入帳號" }]}>
                    <Input required />
                </Form.Item>

                <Form.Item name="password" label="密碼" rules={[{ required: true, message: "請輸入密碼" }]}>
                    <Input required />
                </Form.Item>

                <Form.Item name="email" label="電子信箱" rules={[{ required: true, message: "請輸入電子信箱" }]}>
                    <Input required />
                </Form.Item>

            </Form>
        </Modal>
    )
}
export default AddUserModal