import { Modal } from "antd";

interface DeleteBarPops {
    open: boolean;
    selectCount: number;
    onDelete: () => void;
    onCancel: () => void;
}

function DeleteModal(props: DeleteBarPops) {
    const { open, selectCount, onDelete, onCancel } = props
    const handleDelete = () => {
        Modal.confirm({
            title: `確認刪除${props.selectCount}筆資料?`,
            okText: '刪除',
            cancelText: '取消',
            onOk: () => props.onDelete()
        })
    }

    return (
        <Modal open={open}
            title={`確認刪除${selectCount}筆資料嗎`}
            okText='刪除'
            cancelText='取消'
            okType='danger'
            onOk={onDelete}
            onCancel={onCancel}
            destroyOnHidden>
                刪除後資料無法復原，是否刪除?
            </Modal>
    )
}
export default DeleteModal;