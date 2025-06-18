import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { userLogin } from "../interface/userInterface";
import http from "../utils/axiosUtils";
import axios from "axios";

interface Props {
    open: boolean;
    onOk: (value: userLogin) => void;
    onCancel: () => void;
}

function AddUserModal(props: Props) {

    const { open, onOk, onCancel } = props;
    const [form] = Form.useForm();

    const handleOk = async () => {
        const respone = await axios.post("");
    }

    return (
        <Modal open={open} title="新增使用者" okText="送出" cancelText="取消"  onOk={handleOk} onCancel={onCancel} destroyOnHidden>
            <Form form={form} layout="vertical" >
                <Form.Item name="username" label="分類名稱" rules={[{ required: true, message: "請輸入帳號" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="分類別名" rules={[{ required: true, message: "請輸入密碼" }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddUserModal