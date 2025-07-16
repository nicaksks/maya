export default class MayaError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MayaError'
    }
}