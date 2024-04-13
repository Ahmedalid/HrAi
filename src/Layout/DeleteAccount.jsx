import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem("UserToken");
  let { Url} = useContext(UserContext)
  const { t } = useTranslation();
  // console.log(token );
let navagit = useNavigate()
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.post(
        `${Url}companies/delete-account`,
        null,  // Pass null as the request body if it's not required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // console.log(response.data.status);

      // Assuming your API returns some success response
      if (response.data.status == true) {
        localStorage.removeItem("UserToken");
        navagit("./login")
        toast.success(response.message, {
          position: 'top-center'
        })
        
        // You can perform additional actions upon successful deletion
        
      }
    } catch (error) {
      // console.error('Error deleting account:', error);
      // Handle error scenarios as needed
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="btn font-15 text-white "
      >
        {isDeleting ? 'Deleting...' :t("deleteaccount")}
      </button>
    </div>
  );
};

export default DeleteAccount;
