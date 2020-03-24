/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fromEvent, from } from "rxjs";
import { map } from "rxjs/operators";

/**
 * 프론트엔드 개발의 어려움 중 하나는 비동기를 어떻게 동기적인 흐름과 섞어서 풀 것인가 이다.
 * - 프레임워크나 라이브러리를 공부하기 전에 어떤 철학을 가진 것인지 알고
 *
 * * 다양한 에러 상황에 대한 대처
 * * 여러 가지 협력 관계에 있는 UI 컴포넌트 간의 통신
 * * 성능을 고려한 복잡한 데이터 흐름 제어
 * * 비동기와 동기가 뒤섞인 데이터 흐름 제어
 * 등 실제 서비스에서는 고려할 부분이 많다.
 *
 * 처음 개발을 시작할 떄는 요구사항을 어떻게 프로그래밍할 것인지를 고민하게 된다.
 * 구현 자체에만 초점을 맞추게 되는 것이다.
 * 하지만 시간이 지나면 구현보다는 소프트웨어를 얼마나 효율적으로 유지보수 할 수 있는지?
 * 또는 얼마나 많은 문제점을 설계나 테스트 코드를 통해 사전에 해결할 수 있을지를 고민하게 된다.
 *
 * 결과물(프레임워크)을 잘 사용하는 것도 중요하지만,
 * 그 기술의 결과물이 어떤 고민의 산물인지 아는 것이 더 중요하다.
 * 고민의 원인을 알게 되면 그 기술을 보다 깊에 이래할 수 있고
 * 폭넓게 활용할 수 있다.
 *
 * SPA
 * Web Storage, Web Worker
 * 애플리케이션을 구성하기 위해 필요한 요소 기술들을
 * 브라우저에서 지원하기 시작하면서부터
 * 주로 서버가 담당했던 비즈니스 문제를 점차 클라이언트인 브라우저가 담당하게 되었다.
 *
 * SPA에선 화면을 리로딩하지 않는 이상 자동으로 초기화 되지 않는다.
 * 이런 구조는 기능이 추가될 수록 기존의 상태에 복잡하게 엮일 수 밖에 없다
 *
 * - 웹 애플리케이션은 상태 머신이다
 * 상태머신이란 주어진 시간의 상태(state)가 존재하고,
 * 어떤 한 사건에 의해 다른 상태(state)로 변할 수 있는 수학적 모델이다.
 *
 * 상태머신은 다음과 같이 동작한다
 * 1. 시스템으로 input 발생
 * 2. 로직을 통해 input과 현재 프로그램 상태에 따라 행위를 결정
 * 3. 프로그램 로직은 결정에 따라, 프로그램 상태를 변경
 * 4. 경우에 따라서 프로그램 로직은 output을 생산하기도 한다
 *
 * 예)
 * 1. 사용자가 버튼을 누른다
 * 2. 애플리케이션은 현재 레이어가 닫혀있는 상태인지? 아니면 열려있는 상태인지에 따라 레이어를 열지 아니면 레이어를 닫을지 결정한다
 * 3. 레이어가 열려 있다면 레이어를 닫는 상태로 변경하고, 레이어가 닫혀있다면 레이어를 열려있는 상태로 변경한다
 * 4. 레이어의 DOM에 상태를 적용한다
 *
 * 웹 애플리케이션은 이러한 상태 머신의 집합으로 구성되어 있다. 크게 보면 웹 애플리케이션도 하나의 상태 머신이다
 *
 *
 * RxJS가 해결하려고 한 문제
 * 1. 입력 데이터의 오류
 * RxJS는 동기와 비동기의 차이점을 `시간`이라는 개념을 도입해서 해결하려곻 했다
 * 한 번 이벤트 핸들러를 등록하면 버튼을 누를 때마다 등록된 이벤트 핸들러가 호출된다
 * 이런 과정에 시간이라는 개념을 도입하여 다른 시각을 얻을 수 있다
 *
 * 동기와 비동기는 시간의 축으로 봤을 때는 같은 형태이다
 * 이런 형태는 시간을 인덱스로 둔 컬렉션으로 생각할 수도 있다
 * RxJS에서는 이를 스트림(Stream)이라 표현한다
 *
 * [데이터...데이터...데이터.....]
 * ------------------------> 시간
 *
 * Observable 클래스: Stream을 표현하는 클래스
 *
 * # Observable은 시간을 인덱스로 둔 컬렉션을 추상화한 클래스다.
 * 이 클래스는 동기나 비동기의 동작 방식으로 전달된 데이터를 하나의 컬랙션으로 바라볼 수 있게 해준다
 * 개발자는 데이터가 어떤 형태로 전달되는지에 대해 더이상 고민할 필요 없어진다.
 * 단지 Observable을 통해 데이터를 전달 받기만 하면 된다
 *
 * - 모든 데이터는 Observable 인스턴스로 만들 수 있다
 *  - 키보드 입력 데이터
 *  - 마우스 이동/클릭 데이터
 *  - Ajax/fetch 요청을 통해 얻은 데이터
 *  - Web Socket을 통해 전달된 데이터
 *  - Message를 통해 전달된 데이터
 *
 *
 *
 */

const Rx1 = () => {
  // fromEvent(HTMLElement, '이벤트 타입');
  // event를 Observable로 만들 때.
  const key$ = fromEvent(document, "keydown"); // keyStream
  const click$ = fromEvent(document, "click"); // clickStream

  // from(Iterable|Array-Like|Promise);
  // iterable, array-like, Promise 데이터를 Observable로 만들 때는 from을 이용
  const arrayFrom$ = from([10, 20, 30]); // arrayFromStream
  const iterableFrom$ = from(
    // iterableFromStream
    new Map([
      [1, 2],
      [2, 4],
      [4, 8],
    ])
  );
  // const ajaxPromiseFrom$ = from(fetch("./api/some.json"));

  console.log({
    key$,
    click$,
    arrayFrom$,
    iterableFrom$,
  });

  const example = key$.pipe(map(event => event.timeStamp));
  const subscribe = example.subscribe(val => console.log(val));

  return <div>h</div>;
};

export default Rx1;
