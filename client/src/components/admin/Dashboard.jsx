import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/createUser', {
        name,
        email,
        password,
        role,
      });
      setMsg('User created successfully');
      fetchUsers();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Menampilkan error JSON dari server di console
        setMsg(error.response.data.msg || 'Error creating user'); // Menampilkan pesan error di UI
      } else {
        console.log(error); // Jika error tidak terkait dengan respon dari server, tampilkan di console
        setMsg('Error creating user');
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='min-h-screen justify-center items-center bg-slate-300'>
      <h1 className="text-center  font-loader p-10 text-2xl font-bold">Admin Dashboard</h1>
      <div className="container flex mx-auto">
        <div className='container rounded-lg text-white bg-slate-500 m-10 max-w-80 mx-auto p-4'>
          <div className='flex py-4  text-center justify-center items-center '>
            <h1 className="text-2xl font-bold">Create User</h1>
          </div>
          <div className=''>
            <form onSubmit={createUser} className="mb-4">
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded p-2 w-full text-black"
                />
              </div>
              <div className="mb-2">
                <label className="block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded p-2 w-full text-black"
                />
              </div>
              <div className="mb-2">
                <label className="block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded p-2 w-full text-black"
                />
              </div>
              <div className="mb-2">
                <label className="block">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border rounded p-2 w-full text-black"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className='flex  justify-center items-center'>
                <button type="submit" className=" bg-green-700 text-white p-2 rounded">
                  Create User
                </button>
              </div>
              <div className='flex justify-center items-center m-6 font-loader text-yellow-300'>
              {msg && <p>{msg}</p>}
              </div>
            </form>
          </div>
        </div>
        <div className='isolate bg-slate-500 rounded-lg w-full p-1 m-10'>
          <table className="min-w-full bg-slate-200 rounded-md">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center border-4 border-slate-400 rounded-lg  bg-slate-100">
                  <td className="py-2">{user.id}</td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
