import { Button, Input, Space, Table } from "antd";
import { useState } from "react";
import http from "../utils/axiosUtils";


const User = () => {
  //讀取
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: '使用者名稱',
      dataIndex: 'username',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
    }
  ];
  const fetchdata = async () => {
    const respone = await http.get('/user/alluserinfo')
    console.log(respone.data.data)
    setDataSource(respone.data.data)
  }

  return (
    <div>
      <div style={{ background: 'white', width: '100%', borderRadius: '10px', height: 50, display: 'flex', padding: 16, alignItems: 'center' }}>
        <Space >
          <span >Search user: </span>
          <Input />
        </Space>
        <Button style={{ marginLeft: 'auto'}} onClick={fetchdata}>Refresh</Button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={{ position: ['bottomCenter'] }} />
      </div>
    </div >
  );
}
export default User;