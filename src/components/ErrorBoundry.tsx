import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  errorText: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>{this.props.errorText}</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
