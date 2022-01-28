import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
        source={{ uri: "https://nomes.eduardoworrel.com" }}
        style={{ margin: 0 }}
      />
  );
}

