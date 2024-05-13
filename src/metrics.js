import {collectDefaultMetrics, Counter, Registry} from 'prom-client';

const register = new Registry();
collectDefaultMetrics({register});

const log_counter = new Counter({
    name: 'logged_messages',
    help: 'the_amount_of_logged_messages_during_the_runtime',
    registers: [register]
});


export {register, log_counter}