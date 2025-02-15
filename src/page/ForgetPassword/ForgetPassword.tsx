import  { useState } from "react";
import "./ForgetPassword.scss";
import { AuthLayout } from "../../layout";
import { Button, TextField } from "@mui/material";
import OtpInput from "react-otp-input";
import LoadingButton from "@mui/lab/LoadingButton";
import { onOtpRequest, onOtpVerify, onResetPassword } from "../../api";
import { ErrorToast, SuccessToast } from "../../utils";
import { useNavigate } from "react-router-dom";
import PasswordValidationList, {
  onValidatedRules,
  passwordRules,
} from "../../component/PasswordValidationList/PasswordValidationList";
const ForgetPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginAttemptRemaning, setLoginAttemptRemaning] = useState(5);
  const navigate = useNavigate();

  const validatedRules = onValidatedRules(password);
  const isResetDisabled =
    validatedRules.length < passwordRules.length ||
    password !== confirmPassword;

  const sendOtp = async () => {
    try {
      const otpMessage = await onOtpRequest({ email });
      setOtpSent(true);
      SuccessToast(otpMessage.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      setOtpSent(false);
      ErrorToast(e.errorMessage);
    }
  };
  const verifyOtp = async () => {
    try {
      const otpMessage = await onOtpVerify({ email, otp });
      setOtpVerified(otpMessage.verified);
      SuccessToast(otpMessage.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      setOtpVerified(false);
      ErrorToast(e.errorMessage);
    }
  };

  const handleResetPassword = async () => {
    try {
      const otpMessage = await onResetPassword({ email, password, otp });
      SuccessToast(otpMessage.message);
      navigate("/app/user/signin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      const { errorMessage, error } = e;
      const loginAttemptRemaning = error.response.headers["ratelimit-remaining"];
      setLoginAttemptRemaning(loginAttemptRemaning);
      ErrorToast(errorMessage);
    }
  };
  return (
    <AuthLayout
      pageTitle="Forget Password"
      pageDescription={
        !otpSent
          ? "Forget Password? Enter email for OTP"
          : otpSent && !otpVerified
          ? "Enter OTP"
          : "Enter Password and Confirm Password "
      }
    >
      <form className="py-4 px-4 relative">
        {!otpSent && (
          <>
            <div className="my-4">
              <TextField
                id="email"
                name="email"
                autoComplete="email"
                label="Enter Email/User ID"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex my-4">
              <Button variant="text" sx={{ pt: 0, pb: 0 }} onClick={sendOtp}>
                <span className="underline mingle-font-x-small">Send OTP</span>
              </Button>
            </div>
          </>
        )}

        {otpSent && !otpVerified && (
          <>
            <div className="my-4 flex flex-col justify-center items-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input {...props} className="otp-box" />
                )}
              />
            </div>
            <div className="flex my-4 justify-center">
              <Button variant="text" sx={{ pt: 0, pb: 0 }} onClick={sendOtp}>
                <span className="underline mingle-font-x-small">
                  ReSend OTP
                </span>
              </Button>{" "}
              |
              <Button variant="text" sx={{ pt: 0, pb: 0 }} onClick={verifyOtp}>
                <span className="underline mingle-font-x-small">
                  Verify OTP
                </span>
              </Button>
            </div>
          </>
        )}

        {otpSent && otpVerified && (
          <>
            <div className="my-4">
              <TextField
                id="password"
                name="password"
                label="Enter Password"
                variant="outlined"
                size="small"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-4">
              <TextField
                id="confirm-password"
                name="confirm-password"
                label="Enter Confirm Password"
                variant="outlined"
                size="small"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="my-4">
              <LoadingButton
                variant="contained"
                disabled={isResetDisabled}
                sx={{ background: "var(--mingle-primary-color)" }}
                onClick={handleResetPassword}
              >
                Reset Password
              </LoadingButton>
            </div>
            <div className="my-4">
              <PasswordValidationList password={password} />
            </div>
          </>
        )}
      </form>
      {loginAttemptRemaning < 5 && (
        <h5 className="w-full flex justify-center absolute font-bold top-0 left-0 mingle-danger-text">
          {" "}
          {loginAttemptRemaning} Login Attempt Remaning.
        </h5>
      )}
    </AuthLayout>
  );
};

export default ForgetPassword;
