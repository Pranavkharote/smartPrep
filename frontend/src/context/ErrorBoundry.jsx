// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI is rendered
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can log error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in the Dashboard.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
