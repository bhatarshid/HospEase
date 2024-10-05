class AppError extends Error {
    constructor(message: string, statuscode: number){
        super(message);
        this.statusCode = statuscode;
        this.explanation = message;
    }
    
    public statusCode: number;
    public explanation: string;
}

export default AppError 