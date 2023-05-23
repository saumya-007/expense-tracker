const cron = require('node-cron')
const Worker = require('worker_threads')
class CronUtils {
    constructor() {
        this.cron = cron;
        this.taskQueue = [];
    }

    intiCrons({ cronString, cb }) {
        this.taskQueue.push(this.cron.schedule(cronString, cb));
    }

    stopCrons() {

    }

    startCrons() {
        this.taskQueue.forEach(task => {
            
        }) 
    }
}

module.exports = CronUtils;
