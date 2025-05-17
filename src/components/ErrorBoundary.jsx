import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-purple-50 to-white text-gray-700">
          <h1 className="text-4xl font-bold mb-2">Something went wrong.</h1>
          <p className="mb-4 text-gray-500">
            Our team has been notified. Please try refreshing the page or come
            back later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
