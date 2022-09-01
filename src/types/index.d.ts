declare global {
    namespace Express {
        interface User{
            username: string;
        }
    }
}

declare module "Express-session" {
    interface SessionData {
        redirectTo: string ,
    }
}
export {}