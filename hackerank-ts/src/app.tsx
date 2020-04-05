import { hot } from "react-hot-loader/root";
import React, { MouseEvent, ChangeEvent, FormEvent, Component } from "react";
import { css, Global } from "@emotion/core";
import { globalStyles } from "./global-style";
import { Table } from "./components/table";
import { Search } from "./components/search";
import { Button, ButtonProps } from "./components/button";
import { withLoading } from "./components/loading";

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

type ResultsType = {
  [key: string]: ResultType;
};

type AppState = {
  results: ResultsType | null;
  searchKey: string;
  searchTerm: string;
  error: Error | null;
  isLoading: boolean;
};

const ButtonWithLoading = withLoading<ButtonProps>(Button);

class App extends Component<{}, AppState> {
  // https://stackoverflow.com/questions/51305171/typescript-and-react-setting-initial-state-with-empty-typed-array
  state: Readonly<AppState> = {
    results: null,
    searchKey: "",
    searchTerm: "redux",
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopstories(searchTerm);
  }

  needsToSearchTopStories = (searchTerm: string) =>
    !this.state.results![searchTerm];

  fetchSearchTopstories = (searchTerm: string, page: number = 0): void => {
    this.setState({ isLoading: true });
    fetch(
      `https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}&hitsPerPage=20`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(error => this.setState({ error }));
  };

  /** dismiss */
  onDismiss = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    const { searchKey, results } = this.state;
    const { hits, page } = results![searchKey];

    const isNotId = (hit: HitType) => hit.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } },
    });
  };

  /** searching */
  onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.currentTarget.value });
  };

  onSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm);
    }
  };

  setSearchTopstories = (result: ResultType) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: [...oldHits, ...hits], page },
      },
      isLoading: false,
    });
  };

  /** fetch more */
  fetchMore = (e: MouseEvent<HTMLButtonElement>) => {
    const { searchKey } = this.state;
    const page = e.currentTarget.dataset!.page || 0;
    this.fetchSearchTopstories(
      searchKey,
      (parseInt(page.toString(), 10) || 0) + 1
    );
  };

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page = results && results[searchKey] && results[searchKey].page;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    if (error) {
      return <p>Something went wrong.</p>;
    }
    return (
      <div
        css={css`
          padding: 1rem;
        `}
      >
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
        <Table list={list} onDismiss={this.onDismiss} />
        <div css={styles.interactions}>
          <ButtonWithLoading
            isLoading={isLoading}
            data-page={page}
            onClick={this.fetchMore}
          >
            더보기
          </ButtonWithLoading>
        </div>
      </div>
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
