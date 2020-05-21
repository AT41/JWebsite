import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO Clean this up
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  public httpRequest(urlQuery: string): Observable<any> {
    return this.http.get(urlQuery);
  }
  /*public server;
  public serverApp = app;
  private port;
*/
  /*constructor() { 
    /*this.port = this.normalizePort(process.env.PORT || '3000');
    app.set('port', this.port);
    this.server = http.createServer(app);
    
    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }*/
/*
  private normalizePort(val): number {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    // TODO Error logging
    return null;
  }

  private onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening = () => {
    var addr = this.server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  }*/
}
