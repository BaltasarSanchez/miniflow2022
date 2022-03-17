import { Router } from "express";

const routerRoot = new Router();
routerRoot.get("/login", (req, res) => {
    res.send(`"<h1>Login</h1>")
    <form action="/login" method="POST">
        <input type="text" name="email" placeholder="email">
        <input type="password" name="password" placeholder="password">
        <button type="submit">Login</button>
        </form>`);

});

routerRoot.get("/faillogin", (req, res) => {
    res.send(`"<h1>Login fallido</h1>")
    <form action="/login" method="POST">
        <input type="text" name="email" placeholder="email">
        <input type="password" name="password" placeholder="password">
        <button type="submit">Login</button>
        </form>`);
});



app.get('/logout', (req, res) => {
    res.send('<h1>Session Finalizada</h1>')
    req.logout();
});

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenido</h1>
    <p>${req.user.nombre}</p> 
    <a href="/logout">Logout</a>`);
});


export default routerRoot;
