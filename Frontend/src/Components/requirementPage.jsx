import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequirementPage = () => {
  const [reqlist, setReqlist] = useState([]);
  const [activeTab, setActiveTab] = useState('requirement');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/requirementlist')
      .then(res => setReqlist(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg mr-2 ${
            activeTab === 'requirement' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('requirement')}
        >
          Requirement
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg ${
            activeTab === 'design' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('design')}
        >
          Design
        </button>
      </div>

      {activeTab === 'requirement' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Requirement List</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Requirement</th>
                <th className="py-2 px-4 border-b">Requirement Detail</th>
              </tr>
            </thead>
            <tbody>
              {reqlist.map((data) => (
                <tr key={data.id}>
                  <td className="py-2 px-4 border-b">{data.req_id}</td>
                  <td className="py-2 px-4 border-b">{data.reqName}</td>
                  <td className="py-2 px-4 border-b">{data.reqDetail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'design' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Design</h2>
          <p>ส่วนนี้จะแสดงรายละเอียดการออกแบบของโปรเจค</p>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                อัพโหลดรูปภาพ
              </button>
            </label>
          </div>
          {selectedImage && (
            <div className="mt-4">
              <img src={selectedImage} alt="อัพโหลดการออกแบบ" className="max-w-full h-auto" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequirementPage;