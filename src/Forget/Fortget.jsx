import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/Context';

const ForgetPassword = () => {
  const [old_password, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let { Url } = useContext(UserContext) // Assuming `token` is provided by your `UserContext`

  let token = localStorage.getItem('UserToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // اتصال بالخادم لتغيير كلمة المرور
      const response = await axios.patch(
        `${Url}companies/change-password`,
        {
            old_password,
            password,
          password_confirmation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // عمليات نجاح إذا تم تغيير كلمة المرور بنجاح
    //   console.log(response.data.message);
      setError(response.data.message)
    } catch (error) {
      // معالجة الأخطاء في حالة فشل تغيير كلمة المرور
      setError('Failed to change password. Please try again.');
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-center flex-column col-12 w-100'>
      <h2 className='mt-4'>Forget Password</h2>
  {error &&     <div className="alert alert-danger w-50 text-center" role="alert">
  {error && <p style={{ color: '' }}>{error}</p>}
</div>}

      <form onSubmit={handleSubmit } className='mt-2 w-50'>
        <div>
          <label className='fw-bold mt-3 mb-2'> Old Password</label>
          <input type="password"  className='form-control w-100'  value={old_password} onChange={(e) => setOldPassword(e.target.value)} required />
        </div>
        <div>
          <label  className='fw-bold mt-3 mb-2'>New Password</label>
          <input type="password"  className='form-control w-100' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label  className='fw-bold mt-3 mb-2'>Confirm New Password</label>
          <input type="password" className='form-control w-100'  value={password_confirmation} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className='active-button btn mt-4' disabled={loading}>
  {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'}
</button>

      </form>
    </div>
  );
};

export default ForgetPassword;
