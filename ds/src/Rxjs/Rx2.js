/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fromEvent, from } from "rxjs";
import { map } from "rxjs/operators";

/**
 * RxJS가 해결하려고 한 문제
 * 2. 상태 전파 문제
 *
 * 웹 애플리케이션의 상태
 *
 * System --[use]--> User
 *
 */
const Rx2 = () => {
  class User {
    constructor() {
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
    }
    logout() {
      this._state.name = "";
      this._state.isLogin = false;
    }
  }

  class System {
    constructor(user) {
      this._token = null;
      this._id = "System";
      this._user = user;
    }

    check() {
      const username = this._user.getName();
      // getName, isLogin은 User 클래스와 강하게 엮여 있다
      if (this._user.isLogin()) {
        this._token = [...username].reduce(
          (acc, v) => acc + v.charCodeAt(0),
          0
        );
        return `[${this._id}] ${username}의 토큰은 ${this._token} 입니다.`;
      } else {
        this._token = null;
        return `[${this._id}] 로그인이 되지 않았습니다.`;
      }
    }
  }

  /**
   * 문제점 1.
   * User의 인터페이스가 변경되면 System도 함께 변경되어야 한다.
   *
   * 문제점 2.
   * User 상태를 확인하기 위한 인터페이스에 대한 의사소통 비용이 발생한다.
   * 개발자들 간의 의사소통 비용.
   *
   * 문제점 3.
   * 다수의 클래스가 User에 의존 관계가 있는 경우라면 User의 변경여부를 반영하기 위해
   * 다수의 클래스들이 직접 User의 상태를 모두 반영해야 한다.
   * 즉, 변경에 대한 전파가 원할하게 이루어지지 않는다.
   *
   * user.login(); // User의 상태 변화 발생
   *
   * 의존 관계 있는 모든 클래스에서 처리가 필요하다
   * classA.process()
   * classB.process()
   * classC.process()
   * classD.process()
   *
   * 옵서버 패턴
   *
   * i) Loosely Coupling
   * 옵서버 패턴에서는 상태가 변경될 대상을 `Subject`라고 한다. 그리고, 그 상태 변화를 관찰하는 대상을 Observer라고 한다.
   * 옵서버 패턴에서는 Subject와 Observer가 서로 느슨하게 연결되어 있다
   * 느슨하게 연결되었다는 것은 Subject와 Observer가 서로 상호작용을 하지만 서로 잘 모른다는 뜻이다
   *
   * Subject가 Observer에 대해 아는 것은 Observer가 특정 인터페이스를 구현한다는 것 뿐이다
   * Observer는 언제든지 추가하거나 삭제할 수 있으며 새로운 타입의 Observer를 추가한다고 해도
   * Subject를 변경할 필요가 전혀 없다
   * 또한 Subject와 Observer는 서로 독립적으로 사용할 수 있으며 Observer가 바뀌더라도 서로에게 영향을 미치지 않는다.
   *
   * ii) 자동 상태 전파
   * push 방식
   * 옵서버 패턴은 의존 관계의 대상Subject로 부터 데이터를 제공 받는 방식이다
   * push 방식은 pull 방식에 비해 상태 전파 문제를 효과적으로 처리할 수 있다.
   * Subject가 변경이 되었을 때 관찰하는 Observer에게 자동으로 알려준다
   *
   * 특히 Subject와 Oberver가 1:n 상황일 때 가장 효과적이다
   * 다수의 옵저버를 Subject에 등록하기만 하면 Subject의 변경 사항이 등록된 다수의
   * Observer에게 자동으로 전달된다.
   * 개발자는 데이터 변경 시점을 매번 확인할 필요도 없고 신경쓸 필요도 없다.
   * 단지 변경되었다는 신호가 왔을 경우 처리만 해주면 된다.
   *
   * iii) 인터페이스의 단일화
   * 인터페이스가 증가할 때마다 개발자 간의 의사소통 비용이 증가하고 변경 영향도도 커진다
   * 사실 이 문제는 인터페이스를 줄이는 것만으로도 비용을 줄일 수 있다
   * 하지만 더욱 좋은 방법은 인터페이스가 있어도 없게 만드는 것이다
   * 모든 객체가 사용하는 인터페이스는 메서드A, 메서드B, 메서드C이다 라고 정의하면
   * 서로의 의사소통 비용이 줄어든다
   * 더불어 변경사항이 생기더라도 영향도는 기존 보다 훨씬 낮아진다.
   * 옵서버 패턴은 Observer.update만 존재하기 때문에 Subject에서는 Observer
   * 인터페이스에 대한 별도의 비용이 존재하지 않는다
   *
   *
   * 예)
   * 뉴스를 발행하는 신문사와 이를 구독하는 고객
   *
   * 신문사Subject는 고객observer가 등록하고 신문이 발행될 때 각각의 고객에게
   * 신문이 발행되었다고 알려준다(notify)
   *
   *
   */

  class NewsPaper {
    constructor() {
      this._observers = [];
    }

    setNews(news) {
      this.notify(news);
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
    notify(news) {
      this._observers.forEach(v => {
        v.update(news);
      });
    }
  }

  // Observers
  class NewsScrapper {
    update(news) {
      console.log(`뉴스를 스크랩하자 - ${news}`);
    }
  }

  class NewsReader {
    update(news) {
      console.log(`뉴스를 읽자 - ${news}`);
    }
  }

  let newsPaper = new NewsPaper();

  // 구독하기
  newsPaper.add(new NewsScrapper());
  newsPaper.add(new NewsReader());

  newsPaper.setNews("북한 미사일 발사");
  newsPaper.setNews("코스피 최저점 이탈!");

  // 상태변경

  let user = new User();
  let system = new System(user);
  user.login("sculove");
  user.logout();

  return <div>{system.check()}</div>;
};

export default Rx2;
