import React, { useContext } from 'react';
import useLogout from '../useHooks/useLogout';
import { AuthContext } from '../context/AuthContext';
import useIncomingRequest from '../useHooks/useIncomingRequest';
import useApprovedRequest from '../useHooks/useApprovedRequest';
import useRejectRequest from '../useHooks/useRejectRequest';
import useGetApprovedRequest from '../useHooks/useGetApprovedRequest';

const $db = () => {
  
  const { logoutUser } = useLogout();
  const { user } = useContext(AuthContext);
  const incomingRequests = useIncomingRequest();
  const approvedRequests = useGetApprovedRequest();
  const approved = useApprovedRequest();
  const rejected = useRejectRequest();

  if (!user) {
    return <div>404 Not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hello admin!</h1>
      <button
        onClick={logoutUser}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Signout
      </button>

      <h2 className="text-xl font-semibold mb-2">Pending Requests:</h2>
      
      {incomingRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Admin Name</th>
                <th className="py-2 px-4 text-left">Contact Number</th>
                <th className="py-2 px-4 text-left">Question</th>
                <th className="py-2 px-4 text-left">Date created</th>
                <th className="py-2 px-4 text-left">Request Status</th>
                <th className="py-2 px-4 text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              {incomingRequests
              .sort((a, b) => new Date(b.date_created) -  new Date(a.date_created))
              .map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="py-2 px-4">{request.admin_name}</td>
                  <td className="py-2 px-4">{request.contact_number}</td>
                  <td className="py-2 px-4">{request.license_certificate}</td>
                  <td className="py-2 px-4">{request.date_created}</td>
                  <td className="py-2 px-4">{request.request_status}</td>
                  <td>
                    {request.request_status !== 'approved' || request.request_status !== 'rejected' ? (
                      <>
                      <button onClick={() => approved(request._id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >Approve</button>
                      <button onClick={() => rejected(request._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      >Reject</button>
                      </>
                    ) : (
                      <span className='text-gray-500'>Request {request.request_status}</span>
                    )}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No pending requests found.</p>
      )}


        <h2 className="text-2xl font-bold mb-4">Approved Requests</h2>
        {approvedRequests.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Admin Name</th>
                <th className="py-2 px-4 text-left">Contact Number</th>
                <th className="py-2 px-4 text-left">License Certificate</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedRequests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="py-2 px-4">{request.admin_name}</td>
                  <td className="py-2 px-4">{request.contact_number}</td>
                  <td className="py-2 px-4">{request.license_certificate}</td>
                  <td className="py-2 px-4">{request.request_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="text-gray-500">No Approved Request</span>
        )}
    </div>
  );
};

export default $db;
