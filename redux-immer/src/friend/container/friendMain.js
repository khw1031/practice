import React from "react";
import { getNextFriend } from "../../common/mockData";
import * as actions from "../state";
import FriendList from "../component/friendList";
import { connect } from "react-redux";
import NumberSelect from "../component/numberSelect";
import { MAX_SHOW_LIMIT, MAX_AGE_LIMIT } from "../common";
import {
  getAgeLimit,
  getShowLimit,
  makeGetFriendsWithAgeLimit,
  makeGetFriendsWithAgeShowLimit,
} from "../state/selector";

class FriendMain extends React.PureComponent {
  onAdd = () => {
    const friend = getNextFriend();
    this.props.addFriend(friend);
  };
  render() {
    console.log("Friend main render");
    const {
      friendsWithAgeLimit,
      friendsWithAgeShowLimit,
      ageLimit,
      showLimit,
      setAgeLimit,
      setShowLimit,
    } = this.props;
    return (
      <div>
        <button onClick={this.onAdd}>친구 추가</button>
        <NumberSelect
          onChange={setAgeLimit}
          value={ageLimit}
          options={ageLimitOptions}
          postfix="세 이하만 보기"
        />
        <FriendList friends={friendsWithAgeLimit} />
        <NumberSelect
          onChange={setShowLimit}
          value={showLimit}
          options={showLimitOptions}
          postfix="명 이하만 보기(연령 제한 적용)"
        />
        <FriendList friends={friendsWithAgeShowLimit} />
      </div>
    );
  }
}

const ageLimitOptions = [15, 20, 25, MAX_AGE_LIMIT];
const showLimitOptions = [2, 4, 6, MAX_SHOW_LIMIT];

const makeMapStateToProps = () => {
  const getFriendsWithAgeLimit = makeGetFriendsWithAgeLimit();
  const getFriendsWithAgeShowLimit = makeGetFriendsWithAgeShowLimit();
  const mapStateToProps = (state, props) => {
    return {
      friendsWithAgeLimit: getFriendsWithAgeLimit(state, props),
      friendsWithAgeShowLimit: getFriendsWithAgeShowLimit(state, props),
      ageLimit: getAgeLimit(state, props),
      showLimit: getShowLimit(state, props),
    };
  };
  return mapStateToProps;
};

// const mapStateToProps = (state, props) => {
//   // const friends = state.friend.friends;
//   // const ageLimit = state.friend.ageLimit;
//   // const showLimit = state.friend.showLimit;
//   // const friendsWithAgeLimit = friends.filter(friend => friend.age <= ageLimit);
//   // const friendsWithAgeShowLimit = friendsWithAgeLimit.slice(0, showLimit);
//   return {
//     friendsWithAgeLimit: getFriendsWithAgeLimit(state, props),
//     friendsWithAgeShowLimit: getFriendsWithAgeShowLimit(state, props),
//     ageLimit: getAgeLimit(state, props),
//     showLimit: getShowLimit(state, props),
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addFriend: friend => dispatch(addFriend(friend)),
//   };
// };

export default connect(makeMapStateToProps, actions)(FriendMain);
