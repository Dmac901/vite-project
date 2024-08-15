import "./hello.css"

function Hello() {
    const now = new Date();

    return ( <h1 className="hello">Hello World! <br />Its {now.toDateString()}
    </h1>

    );
}

export default Hello;