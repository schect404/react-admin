import axios from "axios";
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import { User } from "../models/User";
import { setUser } from "../redux/actions/setUserAction";

const Profile = (props: { user: User; setUser: (user: User) => void }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { data } = await axios.put("users/info", {
      first_name,
      last_name,
      email,
    });

    props.setUser(
      new User(data.id, data.first_name, data.last_name, data.email, data.role)
    );
  };

  const passwordSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    await axios.put("user/password", {
      password,
      password_confirm,
    });
  };

  return (
    <Wrapper>
      <h3>Account Information</h3>

      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={first_name}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={last_name}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            defaultValue={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>

      <h3>Change Password</h3>

      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
