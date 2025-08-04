const AdminProfile = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <div className="bg-white p-4 shadow rounded">
        <p><strong>Name:</strong> Admin User</p>
        <p><strong>Email:</strong> admin@example.com</p>
        {/* Add more fields if needed */}
      </div>
    </div>
  );
};

export default AdminProfile;
