import React, { useState } from "react";
import axiosInstance from "../../../helper/axios";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/home";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      setAuth({ accessToken: data });
      navigate(from, { replace: true });
    } catch (error) {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Đăng nhập
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="text"
                            placeholder=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label htmlFor="inputEmail">Tài khoản</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="inputPassword">Mật khẩu</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="password.html"></a>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            href="index.html"
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
