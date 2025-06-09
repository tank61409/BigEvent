import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import AddCategoryModal, { CategoryForm } from '../components/AddCategoryModal';
import DeleteModal from '../components/DeleteModal';
import http from '../utils/axiosUtils';


function Category() {
  useEffect(() => {
    fetchCategory()
  }, [])
  //讀取
  const [category, setCategory] = useState([]);
  //新增
  const [open, setOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  //刪除
  const [selectMode, setSelectMode] = useState(false);
  const [selectKeys, setSelectKeys] = useState<React.Key[]>([]);
  const [deleteModal, setdeleteModal] = useState(false)
  //編輯
  const [currentRecord, setCurrentRecord] = useState<CategoryForm | undefined>()



  const fetchCategory = async () => {
    const respone = await http.get('/category', {})
    console.log(respone.data.data)
    setCategory(respone.data.data)
  }

  const handleAdd = async (value: CategoryForm) => {
    setModalLoading(true)
    try {
      if (value.id) {
        await http.put('/category/updatecategory', value)
        message.success("編輯成功")
      } else {
        await http.post('/category/addcategory', value)
        message.success('新增成功')
      }
      setOpen(false)
      fetchCategory()
    } catch {
      message.error("新增失敗")
    } finally {
      setModalLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await http.delete('/category/deletcategory', { data: { deleteIds: selectKeys } })
    } catch {
      message.error("刪除失敗")
    } finally {
      fetchCategory()
      toggleSelectMode()
      setdeleteModal(false)
    }
  }

  const openEdit = (record: CategoryForm) => {
    setCurrentRecord(record)
    setOpen(true)
  }

  const toggleSelectMode = () => {
    setSelectMode(!selectMode)
    setSelectKeys([])
  }

  const rowSelection = selectMode ? {
    selectRowKeys: selectKeys,
    onChange: (keys: React.Key[]) => setSelectKeys(keys)
  } : undefined


  const columns = [
    {
      title: '類別名稱',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '別名',
      dataIndex: 'categoryAlias',
      key: 'categoryAlias',
    },
    {
      title: '創建時間',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新時間',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: CategoryForm) => {
        return (<Button onClick={(e) => { e.stopPropagation(); openEdit(record) }}>編輯</Button>)
      }
    }
  ];

  return (
    <div>
      <Space>
        <Button type='primary' onClick={() => {setOpen(true);setCurrentRecord(undefined)}} style={{ marginBottom: 16 }}>新增分類</Button>
        <Button type='default' onClick={toggleSelectMode} style={{ marginBottom: 16 }} >{selectMode ? "取消選取" : "選取"}</Button>
        <Button type='default' onClick={() => setdeleteModal(true)} disabled={selectKeys.length === 0} style={{ marginBottom: 16 }} icon={<DeleteOutlined />} danger> 刪除</Button>
      </Space>

      <Table rowKey="id" dataSource={category} columns={columns} pagination={{ position: ['bottomCenter'] }} rowSelection={rowSelection} />
      <DeleteModal open={deleteModal} selectCount={selectKeys.length} onDelete={handleDelete} onCancel={() => setdeleteModal(false)}></DeleteModal>
      <AddCategoryModal open={open} loading={modalLoading} record={currentRecord} onOk={handleAdd} onCancel={() => setOpen(false)} />
    </div>

  )

}

export default Category;
