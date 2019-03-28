import App from './app';
const server = App.server;

server.on('listening', onListening);

function onListening(): void {
  const addr: any = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
