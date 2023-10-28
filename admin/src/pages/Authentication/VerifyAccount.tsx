import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import AuthService from "../../services/AuthServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import Loader from "../../components/skeleton/Skeleton";

const VerifyAccount = () => {
    const { email, token } = useParams();
    const [isVerified, setIsVerified] = useState<boolean | null>(false)

    useEffect(() => {
        const verifyAccount = async () => {
            if (email && token) {
                try {
                    const response = await AuthService.verifyAccount(email, token) as any
                    notifySuccess(response.data.msg);
                    setIsVerified(true);
                } catch (error) {
                    let err = error as any
                    if (err.response.data.error) {
                        notifyError(err.response.data.error);
                        setIsVerified(null);
                    }
                }
            }
        }

        verifyAccount()

    }, [email, token])


    return (
        <div className="w-full h-screen flex items-center justify-center">
            {isVerified === null ? <h1>You need to ask admin</h1> :
                isVerified ? <Navigate to="/signin" /> : <Loader />}
        </div>
    )
}
export default VerifyAccount
