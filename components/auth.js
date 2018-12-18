import Link from "next/link";
import { connect } from "react-redux";
import { verifyToken, removeToken } from "../utils/auth";
import { toggleLogged } from "../store";

class Auth extends React.Component {
  _logIn = () => {
    const token = verifyToken();
    const isLoggedIn = token ? true : false;
    if (token) {
      this.props.dispatch(toggleLogged(isLoggedIn, token));
    }
  };
  _logOut = () => {
    removeToken();
    this.props.dispatch(toggleLogged(false, ""));
  };
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <div>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={this._logOut}>Log out</button>
          ) : (
            <button onClick={this._logIn}>Log in</button>
          )}
        </div>
        <style jsx>{`
          div {
            margin: 20px 0;
          }
        `}</style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(Auth);
