import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import TodoFetchingNode from "./component/TodoFetchingNode";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <TodoFetchingNode />
            </div>
        </QueryClientProvider>
    );
}

export default App;
