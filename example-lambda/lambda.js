
/**
 * lambda file
 */
import serverlessHTTP from 'serverless-http'
import app1 from './server'

export const app = serverlessHTTP(app1)
