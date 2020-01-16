import React, { Component } from "react";
import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import ChatList from "./ChatList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      callback_message: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("AuthId") !== null) {
    } else {
      this.props.history.push("/signin");
    }
  }

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {localStorage.getItem("AuthId") != null ? (
                  <div className="container-lg">
                    <div className="messaging">
                      <div className="inbox_msg">
                        <div className="inbox_people">
                          <ChatList />
                        </div>
                        <div className="mesgs">
                          <h6>Welcome To Chat </h6>
                          <h6>Select user to start chat</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ul>
                    <li>
                      <Link to="/signin">Sign in </Link>
                    </li>
                    <li>
                      <Link to="/signup">Sign up </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
