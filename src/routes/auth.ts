import express, { Router } from 'express';
import { passport } from '../middleware/passport';

const route = Router();
// login route api
route.get("/login", (req, res, next) => {
    if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
        res.status(400);
        return next("Missing redirect parameter")
    }

    req.session.redirectTo = req.query.redirectTo;

    res.redirect("/auth/github/login");

});

route.get(
    "/github/login",
    passport.authenticate("github", {
        scope: ["user : email"]
    })
);

route.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/github/login",
        keepSessionInfo: true
    }),
    (req, res) => {
        if (typeof req.session.redirectTo !== "string") {
            return res.status(500).end()
        }

        res.redirect(req.session.redirectTo)
    }
);

// logout route api

route.get("/logout", (req, res, next) => {
    if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
        res.status(400);
        return next("Missing redirect parameter")
    }
    const redirectUrl = req.query.redirectTo;
    req.logOut((error) => {
        if (error) {
            return next()
        }
        res.redirect(redirectUrl)
    })

})




export default route;