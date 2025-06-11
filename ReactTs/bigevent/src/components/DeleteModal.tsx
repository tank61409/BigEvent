import { Modal } from "antd";

interface DeleteBarPops {
    open: boolean;
    selectCount: number;
    loading: boolean;
    onOk: () => void;
    onCancel: () => void;

}

function DeleteModal(props: DeleteBarPops) {
    const { open, selectCount, onOk, onCancel, loading } = props

    Modal.confirm({
        title: `確認刪除${props.selectCount}筆資料?`,
        okText: '刪除',
        cancelText: '取消',
        onOk: () => props.onOk()
    })


    return (
        <Modal open={open}
            title={`確認刪除${selectCount}筆資料嗎`}
            okText='刪除'
            cancelText='取消'
            okType='danger'
            onOk={onOk}
            onCancel={onCancel}
            destroyOnHidden
            loading={loading}>
            刪除後資料無法復原，是否刪除?
        </Modal>
    )
}
export default DeleteModal;