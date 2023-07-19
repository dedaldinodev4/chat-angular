import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { Observable } from 'rxjs';
import { IMessage } from '../dtos';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io(`${environment.backendApi}`);

  sendMessage(message: { text: string; isLiked: boolean }){
    this.socket.emit('messageToAll', message); 
  }

  join(eventoId: string): void {
    this.socket.emit('joinRoom', eventoId);
  }

  leave(eventoId: string): void {
    this.socket.emit('leaveRoom', eventoId)
  }

  getMessages() {
    let observable = new Observable<IMessage>(observer => {
      this.socket.on('message', (data: IMessage) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }


}
