import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  handleClearData = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch { /* ignore */ }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-6">
          <div className="max-w-md text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Algo correu mal</h1>
              <p className="text-sm text-slate-400">
                A aplicação encontrou um erro inesperado. Tenta recarregar a página ou limpar os dados locais.
              </p>
            </div>
            {this.state.error && (
              <pre className="text-[11px] text-red-400/70 bg-white/5 rounded-lg p-3 overflow-auto max-h-32 text-left">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col gap-2">
              <button
                onClick={this.handleReload}
                className="w-full px-4 py-2.5 rounded-lg bg-white text-[#0a0a0f] font-medium text-sm hover:bg-slate-200 transition-colors"
              >
                Recarregar página
              </button>
              <button
                onClick={this.handleClearData}
                className="w-full px-4 py-2.5 rounded-lg border border-white/20 text-white/80 font-medium text-sm hover:bg-white/5 transition-colors"
              >
                Limpar dados e recarregar
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
