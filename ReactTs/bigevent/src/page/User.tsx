import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import http from "../utils/axiosUtils";
import { user } from "../interface/userInterface";


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

  const handleSearch = (searchText: string) => {
    if (!searchText) {
      fetchdata()
    } else {
      const filtered = dataSource.filter(
        (data: user) => { return !data.username.toLowerCase().indexOf(searchText.toLowerCase()) }
      );
      console.log(filtered)
      setDataSource(filtered);
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div>
      <div style={{ background: 'white', width: '100%', borderRadius: '10px', height: 50, display: 'flex', padding: 16, alignItems: 'center' }}>
        <Space >
          <span >Search user : </span>
          <Input onChange={(e) => { handleSearch(e.target.value) }} />
        </Space>
        <Button style={{ marginLeft: 'auto' }} onClick={fetchdata}>Refresh</Button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Table rowKey="username" dataSource={dataSource} columns={columns} pagination={{ position: ['bottomCenter'] }} />
      </div>
    </div >
  );
}
export default User;