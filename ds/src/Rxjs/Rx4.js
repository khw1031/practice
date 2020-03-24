/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fromEvent, from } from "rxjs";
import { map } from "rxjs/operators";
import { useEffect, useState } from "react";

/**
 * 반복문과 분기문 그리고 변수는 우리 코드를 복잡하게 만든다.
 * 반복문은 우리 코드의 가독성을 떨어뜨리고 분기문은 우리가 확인해야 할 프로그램의 흐름을 여러 개로 만든다
 * 더군다나 우리가 기억해 놓은 변수의 값은 누군가에 의해 변경될 수 있다.
 * 이렇게 반복문과 분기문 그리고 변수는 우리 코드의 복잡도를 높이고 가독성을 떨어뜨린다
 * 결국에는 오류 발생 빈도를 높인다.
 *
 * 로직의 복잡성을 줄이는 가장 간단한 방법으로는 기능을 쪼개는 것이다
 * 기능별로 쪼갠다는 것을 자칫 단순히 구역별로 쪼개게 되면 기능의 의미를 명확하게 드러내지 못한다
 * 더불어 이런 코드는 재사용성을 떨어뜨린다
 * 이렇게 기능을 쪼개는 일이 쉽지 않은 이유는 코드 대다수는 다음과 같이 로직과 반복문, 분기문의 결합으로
 * 구성되어 있기 때문이다
 * 코드에서 반복문과 분기문을 제거한다는 것은 사실상 불가능하다. 하지만 기능 단위로 분리할 수 있다면
 * 기능을 추상화할 수 있고, 이로 인해 로직의 복잡성을 줄일 수 있다.
 *
 * 변수는 오류의 시작
 * 변수를 사용한다는 의미는 오류를 발생시킬 수 있는 확률을 높인다
 * 변수는 변경될 수 있는 값이기 때문에 유용하다.
 * 반면, 의도치 않게 이 값이 바뀔 경우에 우리는 오류에 직면하게 된다.
 * 브라우저 환경의 자바스크립트에서는 싱글 스레드 구조이기 때문에 멀티 스레드 사용으로 인한 동시성 문제는 자주 발생하지 않는다.
 * 하지만 DOM에 등록된 이벤트 핸들러에 의해 변수의 값이 변경되거나 비동기 행위로 인해 외부로 노출된 변수의 값들이 변경될 수 있다. 따라서 우리는 변수의 노출 범위를 제한하거나 제거함으로써 변수의 값이
 * 외부에 의해 변경되지 않고 개발자의 의도에 따라 정확하게 변경될 수 있도록 보장해야 한다.
 *
 * - WebWorker와 같은 기술 스펙을 사용하면 멀티 스레드 기술을 사용할 수 있지만 브라우저는 기본적으로 하나의 메인 스레드에서 모든 작업이 이루어진다.
 *
 */

const Rx4 = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://swapi.co/api/people/?format=json")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error");
        }
      })
      .then(({ results }) => setUsers(process(results)))
      .catch(console.error);
  }, []);
  console.log(users);
  function process(users) {
    return users
      .filter(user => /male|female/.test(user.gender))
      .map(user => {
        let broca;
        let bmi;
        if (user.gender === "male") {
          broca = (user.height - 100 * 0.9).toFixed(2);
          bmi = ((((user.height / 100) * user.height) / 100) * 22).toFixed(2);
        } else {
          broca = (user.height - 100 * 0.9).toFixed(2);
          bmi = ((((user.height / 100) * user.height) / 100) * 21).toFixed(2);
        }
        const obesityUsingBroca = (((user.mass - broca) / broca) * 100).toFixed(
          2
        );
        const obesityUsingBmi = (((user.mass - bmi) / bmi) * 100).toFixed(2);
        return { ...user, bmi, broca, obesityUsingBroca, obesityUsingBmi };
      });
  }

  // 불변 객체 Observable
  // ES5 Array의 고차 함수들이 반환값으로 새로운 Array 객체를 반환하여 각각에 영향을 미치지 않도록 하는 것과 같이
  // RxJS의 오퍼레이터는 항상 새로운 Observable을 반환함으로써 Array의 고차 함수와 같이
  // 불변 객체를 반환한다
  // 불변 객체는 생성 후 그 상태를 바꿀 수 없는 객체다.
  // 불변 객체는 외부에서 값을 변경할 수 없기 때문에 불변 객체를 사용하는 것만으로도 프로그램의 복잡도가 줄어들 수 있다.
  //
  return users.length < 1 ? (
    <div>loading...</div>
  ) : (
    <div>
      <ul
        css={css`
          list-style: none;
        `}
      >
        {users.map(user => (
          <li key={user.name}>
            <h2>{user.name}</h2>
            <p>키: {user.height} cm</p>
            <p>몸무게: {user.mass} kg</p>
            <p>BROCA 표준체중: {user.broca} kg</p>
            <p>BROCA 비만도: {user.obesityUsingBroca}</p>
            <p>BMI 표준체중: {user.bmi} kg</p>
            <p>BMI 비만도: {user.obesityUsingBmi}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rx4;
