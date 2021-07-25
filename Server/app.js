import express from "express";
import mongoose from 'mongoose';
import schema from './graphqlSchema/schema.js'
import pkg from "express-graphql";
const { graphqlHTTP } = pkg
import { mongoUri } from "./appConfig.js";
import cors from 'cors'
import { setRequestsAccessHeader } from './corsMiddlewares.js'

const app = express();

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`u r listen on port ${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => console.log(err))

app.use(setRequestsAccessHeader)
app.use(express.json());
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    catch: (err) => console.error("gql", err),
    graphiql: true,
  })
);

