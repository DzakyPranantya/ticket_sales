const { midOne } = require("./middlewares/simple-middleware");
const express = require(`express`);
const app = express();
const PORT = 8000;
const middleware = "Run Middleware One";
const cors = require(`cors`);
app.use(cors());

const userRoute = require(`./routes/user.route`);
const eventRoute = require(`./routes/event.route`)
const auth = require(`./routes/auth.route`);
const ticketRoute = require(`./routes/ticket.route`);


app.use(`/ticket`,ticketRoute)
app.use(`/event`,eventRoute)
app.use(`/auth`, auth)
app.use('/user', userRoute)
app.use(express.static(__dirname))

app.listen(PORT, () => {
  console.log(`Server of Ticket Sales runs on port ${PORT}`);
});
app.listen(midOne, () => {
  console.log(midOne);
});

module.exports = app