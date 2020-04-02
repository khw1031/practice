import { hot } from "react-hot-loader/root";
import React, { MouseEvent, ChangeEvent, FormEvent, Component } from "react";
import { css, Global } from "@emotion/core";
import { globalStyles } from "./global-style";
import { Table } from "./components/table";
import { Search } from "./components/search";
import { Button } from "./components/button";

export type HitType = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: string;
};

type ResultType = {
  hits: HitType[];
  page?: number;
  hitsPerPage?: number;
};

type AppState = {
  result: ResultType | null;
  searchTerm: string;
};

class App extends Component<{}, AppState> {
  // https://stackoverflow.com/questions/51305171/typescript-and-react-setting-initial-state-with-empty-typed-array
  state: Readonly<AppState> = {
    result: null,
    searchTerm: "redux",
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  fetchSearchTopstories = (searchTerm: string, page: number = 0): void => {
    fetch(
      `https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`
    )
      .then(response => response.json())
      .then(this.setSearchTopstories)
      .catch(e => e);
  };

  /** dismiss */
  onDismiss = (e: MouseEvent<HTMLButtonElement>) => {
    const isNotId = (hit: HitType) =>
      hit.objectID !== e.currentTarget.dataset.id;
    const updatedHits = this.state.result!.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits },
    });
  };

  /** searching */
  onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.currentTarget.value });
  };

  onSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
    console.log(this.state.searchTerm);
  };

  setSearchTopstories = (result: ResultType) => {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result?.hits || [] : [];
    this.setState({ result: { ...result, hits: [...oldHits, ...hits] } });
  };

  /** fetch more */
  fetchMore = (e: MouseEvent<HTMLButtonElement>) => {
    const { searchTerm } = this.state;
    const page = e.currentTarget.dataset!.page || 0;
    this.fetchSearchTopstories(searchTerm, (parseInt(page.toString(), 10) || 0) + 1);
  };

  render() {
    const { searchTerm, result } = this.state;
    const page = result?.page || 0;
    return (
      <>
        <Global styles={globalStyles} />
        <div css={styles.wrapper}>
          <div css={styles.interactions}>
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              검색
            </Search>
          </div>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div css={styles.interactions}>
          <Button data-page={page} onClick={this.fetchMore}>
            더보기
          </Button>
        </div>
      </>
    );
  }
}

export default hot(App);

const styles = {
  wrapper: css`
    margin: 20px;
  `,
  interactions: css`
    text-align: center;
  `,
};
