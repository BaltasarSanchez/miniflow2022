import log4js from 'log4js';


log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'logs/warnAndErrors.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'all',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    }
  },
  categories: {
    default: {
      appenders: ['loggerConsola','loggerArchivoErrores'],
      level: 'all',
    }
  }
})

const logger = log4js.getLogger()

//export logger
export default logger
