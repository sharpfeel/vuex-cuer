import { StoreBase, CuerMixin } from "../src/cuer";
import { Store } from "vuex";

const state = {
  v: 1
};

type UserState = typeof state;

class Commits extends CuerMixin<UserState, UserStore> {
  /**
   * test1
   */
  test1() {
    this.cuer.state.v++;
  }
}
class Dispatchs extends CuerMixin<UserState, UserStore> {
  /**
   * test2
   */
  test2() {
    this.cuer.commit.test1();
  }
}

class UserStore extends StoreBase<UserState, Commits, Dispatchs> {
  constructor(state: UserState) {
    super(state);
    this._commit = new Commits(this);
    this._dispatch = new Dispatchs(this);
  }
}

const store = new UserStore(state);

export default store;
