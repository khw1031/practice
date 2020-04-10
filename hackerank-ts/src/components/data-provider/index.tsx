import React from "react";

type DataProviderState = {
  data: string;
};
type DataProviderProp = {
  render: (data: string) => React.ReactNode;
};

export default class DataProvider extends React.Component<
  DataProviderProp,
  DataProviderState
> {
  state: Readonly<DataProviderState> = {
    data: null,
  };
  componentDidMount() {
    setTimeout(() => this.setState({ data: "Hey there!" }), 5000);
  }

  render() {
    if (this.state.data === null) return null;
    return <section> {this.props.render(this.state.data)} </section>;
  }
}
