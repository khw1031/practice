/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fromEvent, from } from "rxjs";
import { map } from "rxjs/operators";

const Rx3 = () => {
  class Subject {
    constructor() {
      this._observers = [];
    }
    add(observer) {
      this._observers.push(observer);
    }
    remove(observer) {
      let idx = this._observers.indexOf(observer);
      if (idx !== -1) {
        this._observers.splice(idx, 1);
      }
    }
    notify(status) {
      this._observers.forEach(v => v.update(status));
    }
  }

  class User extends Subject {
    constructor() {
      super();
      this._state = {
        name: "kim",
        isLogin: false,
      };
    }
    getName() {
      return this._state.name;
    }
    isLogin() {
      return this._state.isLogin;
    }
    login(name) {
      this._state.name = name;
      this._state.isLogin = true;
      this.notify(this._state);
    }
    logout() {
      this._state.name = "";
      this._state.isLogin = false;
      this.notify(this._state);
    }
  }

  class System {
    constructor() {
      this._token = null;
      this._id = "System";
    }

    update(status) {
      if (status.isLogin) {
        this._token = Array.prototype.reduce.call(
          status.name,
          (acc, v) => acc + v.charCodeAt(0),
          0
        );
        console.log(
          `[${this._id}] ${status.name}의 토큰은 ${this._token} 입니다.`
        );
      } else {
        this._token = null;
        console.log(`[${this._id}] 로그아웃 되었습니다.`);
      }
    }
  }

  let user = new User();
  let system = new System();
  user.add(system);
  user.login("sculove");
  user.logout();
  user.login("crazymonlong");

  return <div>test</div>;
};

export default Rx3;
