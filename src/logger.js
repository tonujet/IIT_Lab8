import {FluentClient} from '@fluent-org/logger';
import {fluentd} from './config.js';

const logger = new FluentClient('lab7', {
    socket: {
        host: fluentd.host,
        port: fluentd.port,
        timeout: 3000, // 3 seconds
    }
});

export {logger};