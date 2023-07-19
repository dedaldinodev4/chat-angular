import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './services/chat.service'
import { IMessage } from './dtos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chat-feature';

  connection: Subscription | undefined;
  message: string = '';
  readonly userId: string = '818635a1-bd19-41d1-96e0-5f4f06bad991';
  messages: IMessage[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.join(this.userId)
    this.connection = this.chatService.getMessages().subscribe((message: IMessage) => {
      this.messages.push(message)
    });
  }

  ngOnDestroy(): void {
    this.connection?.unsubscribe;
    this.chatService.leave(this.userId);
  }

  sendMessage() {
    this.chatService.sendMessage({
      text: this.message,
      isLiked: false
    });
    this.message = '';
  }

  likedMessage(index: number) {
    this.messages[index].isLiked = !this.messages[index].isLiked;
  }

  removeMessage(message: IMessage) {
    this.messages = this.messages.filter( obj => obj !== message );
  }


}


