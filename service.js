const grpc = require('grpc');
const express = require('express');
const http = require('http');

const proto = '../protos/twitter/tweet-svc.proto';
const twitter = grpc.load(proto).twitter;

const app = express();

grpc.credentials.createInsecure();
const TweetClient = new twitter.Tweets(
    '0.0.0.0:9001',
    grpc.credentials.createInsecure()
);

app.use('/tweets/:tweetid', (req, res, next) => {
    TweetClient.getTweet({ id: req.params.tweetid }, (err, tweet) => {
        if (err) {
            console.error(err);
            return res.json(err);
        }
        res.json(tweet);
    });
});

app.listen(8080);
