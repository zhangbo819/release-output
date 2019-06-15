import React, { Component } from 'react';

class App extends Component {

    download = () => {
        fetch('http://localhost:8080/app.bundle.js').then(res => res.blob().then(blob => {
            console.log(blob)
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            let filename = res.headers.get('Content-Disposition');
            console.log("filename, url", filename, url)
            if (filename) {
                filename = filename.match(/\"(.*)\"/)[1]; //提取文件名
                a.href = url;
                a.download = filename; //给下载下来的文件起个名字
                a.click();
                window.URL.revokeObjectURL(url);
                a = null;
            }
        }));
    }

    render() {
        return (
            <div className="game BoardBg">
                <div className="game-board">
                    {/* <form method="get" action="http://localhost:8080/package.json">
                        <button type="submit">{"下载"}</button>
                    </form> */}

                    <input type="button" value="下载" onClick={this.download} />
                </div>
            </div>
        );
    }
}

export default App;