import * as React from 'react';
import { Component, ErrorInfo } from 'react';
import { Link, Redirect } from '@reach/router';

// reactjs.org/docs/error-boundaries.html

interface ErrorBoundaryState {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);

    this.state = { hasError: false, redirect: false };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  public render() {
    if (this.state.redirect) return <Redirect to="/" />

    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing.
          {" "}
          <Link to="/">Click here</Link> to go back to the home page.
        </h1>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
