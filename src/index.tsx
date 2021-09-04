import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Add FPS meter for development
if (process.env.NODE_ENV === "development") {
    import("stats-js")
        .then(({default: Stats}) => {
            const stats = new Stats();
            stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(stats.dom);
            function animate() {
                stats.begin();
                // monitored code goes here
                stats.end();
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
            stats.dom.style.right = "0";
            stats.dom.style.left = "initial";
        })
        .catch(err => {
            console.log(err);
        });
}
