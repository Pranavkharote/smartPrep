// ErrorBoundary.jsx
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Markdown crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-red-500">⚠️ Something went wrong rendering AI response.</p>;
    }

    return this.props.children;
  }
}
